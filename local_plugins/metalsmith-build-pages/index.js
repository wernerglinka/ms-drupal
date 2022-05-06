/* global __dirname, require, console, module, plugin, metalsmith, setImmediate, error, response, data, process */
/* jslint for:true */

const fetch = require("node-fetch");
const commonTags = require("common-tags");
const toCamelCase = require("./to-camel-case");
const buildInitialPageObject = require("./get-page-object");
const hexToRgba = require("./hex-to-rgba");
const isColorDark = require("./is-color-dark");

// query fragments
const includeFragment = require("./query-fragments/include");
const sectionedPageFragment = require("./query-fragments/sectioned-page");
const sectionIntroFragment = require("./query-fragments/section-intro");
const sectionCtaBannerFragment = require("./query-fragments/section-cta-banner");
const paragraphCommonsFragment = require("./query-fragments/paragraph-commons");
const paragraphTextFragment = require("./query-fragments/paragraph-text");
const paragraphCtaFragment = require("./query-fragments/paragraph-cta");

/**
 * Metalsmith plugin to build pages from api data
 */
function plugin() {
  const getPageDataQuery = (serverURL, page) => {
    const query = commonTags.oneLineTrim`
      ${includeFragment}
      ${sectionedPageFragment}
      ${sectionIntroFragment}
      ${sectionCtaBannerFragment}
      ${paragraphCommonsFragment}
      ${paragraphTextFragment}
      ${paragraphCtaFragment}
    `;

    return serverURL + page + query;
  };

  return (files, metalsmith, done) => {
    const serverUrl = "https://dev-dorka.pantheonsite.io";
    const pageURL = "/jsonapi/node/sectioned_page";
    const sectionedPagesRequest = getPageDataQuery(serverUrl, pageURL);
    let pageContent;
    let pageName;

    // get data from the DORKA server API
    fetch(sectionedPagesRequest)
      .then(response => response.json())
      .then(json => {
        // get all pages
        const sectionedPageData = json.data.filter(thisPage => thisPage.type.includes("sectioned_page"));

        // get all paragraph
        const allParagraphs = json.included;

        // get the object with all available sections
        // if allParagraphs is null then we got a page without sections
        const allSectionData =
          allParagraphs && allParagraphs.filter(section => section.type.includes("paragraph--section_"));

        // create the initial page object
        sectionedPageData.forEach(thisPage => {
          // get the page name
          pageName = thisPage.attributes.title.toLowerCase().replace(/\s/g, "-");

          // get the page metadata
          // metadata are fields directly attached to the content type
          // therefore they can be accessed via data.attributes
          const pageObj = buildInitialPageObject(thisPage);

          // clear allSections for next page
          const allSections = [];

          // get the page sections
          // page sections are implemented as Drupal paragraphs
          // they can be accessed via included.relationships
          const pageSectionsArray = thisPage.relationships.field_sections.data;

          pageSectionsArray.forEach(section => {
            // get the section name
            const thisSection = section.type.replace("paragraph--section_", "");
            // get the component ID
            const thisSectionID = section.id;

            // get section fields and base component IDs
            const sectionData = allSectionData.filter(thisSectionData => thisSectionData.id === thisSectionID);

            /* find the fields for this section, they will start with "field_"
               example, from this:
               attributes: {
                  field_test_field_single: null,
                  field_hasCTAs: false,
               },

            to this:
            {
              test_field_single: null,
              hasCTAs: false,
            }
            */

            // section fields
            const sectionFields = {};
            Object.keys(sectionData[0].attributes).forEach(key => {
              sectionFields[key.replace("field_", "")] = sectionData[0].attributes[key];
            });

            /* find the base components for this section, they will start with "field_"
               example, from this:
                relationships: {
                field_commons: [Object],
                field_ctas: [Object],
                field_text: [Object],
               },
              
              to this:

              {
                commons: {Object},
                ctas: [Object],
                text: {Object},
              }
    
            */
            // base component IDs
            const baseComponents = {};
            Object.keys(sectionData[0].relationships).forEach(key => {
              if (key.startsWith("field_")) {
                baseComponents[key.replace("field_", "")] = sectionData[0].relationships[key].data;
              }
            });

            // get the section base components data
            const sectionBaseComponentsData = {};
            Object.keys(baseComponents).forEach(key => {
              // if baseComponents[key] is an array we loop over it and create a new object for each item
              // for example for multiple ctas
              if (Array.isArray(baseComponents[key])) {
                sectionBaseComponentsData[key] = [];
                let temp = {};
                baseComponents[key].forEach(baseComponentObject => {
                  // try to match the base component object with one paragraph object
                  allParagraphs.forEach(paragraph => {
                    if (paragraph.id === baseComponentObject.id) {
                      // we got a match, now normalize the keys
                      Object.keys(paragraph.attributes).forEach(pkey => {
                        if (pkey.startsWith("field_")) {
                          const newKey = pkey.replace("field_", "");
                          temp = { ...temp, [newKey]: paragraph.attributes[pkey] };
                        }
                      });
                    }
                  });
                  sectionBaseComponentsData[key].push(temp);
                });
              } else {
                sectionBaseComponentsData[key] = {};
                allParagraphs.forEach(paragraph => {
                  if (paragraph.id === baseComponents[key].id) {
                    Object.keys(paragraph.attributes).forEach(pkey => {
                      if (pkey.startsWith("field_")) {
                        const newKey = pkey.replace("field_", "");
                        if (key === "commons") {
                          if (typeof paragraph.attributes[pkey] === "object" && paragraph.attributes[pkey] !== null) {
                            if (paragraph.attributes[pkey].color) {
                              // convert the hex color to rgb
                              const rgba = hexToRgba(
                                paragraph.attributes[pkey].color,
                                paragraph.attributes[pkey].opacity
                              );
                              Object.assign(sectionFields, { [newKey]: rgba });
                              // check if color is too dark
                              Object.assign(sectionFields, { colorIsDark: isColorDark(rgba) });
                            } else {
                              Object.assign(sectionFields, { [newKey]: paragraph.attributes[pkey] });
                            }
                          } else {
                            Object.assign(sectionFields, { [newKey]: paragraph.attributes[pkey] || "" });
                          }
                        } else if (
                          typeof paragraph.attributes[pkey] === "object" &&
                          paragraph.attributes[pkey] !== null
                        ) {
                          Object.assign(sectionBaseComponentsData[key], { [newKey]: paragraph.attributes[pkey].value });
                        } else {
                          Object.assign(sectionBaseComponentsData[key], { [newKey]: paragraph.attributes[pkey] });
                        }
                      }
                    });
                  }
                });
              }
            });

            // delete commons base component as its properties are already added to the sectionFields object
            delete sectionBaseComponentsData.commons;

            // a single sections object
            allSections.push({
              component: thisSection,
              ...sectionFields,
              ...sectionBaseComponentsData,
            });
          });

          // create a single page object and convert all keys to camelCase
          pageContent = {
            ...pageObj,
            sections: toCamelCase(allSections),
          };

          const fileName = `${pageName}.md`;

          const page = {
            ...pageContent,
            contents: Buffer.from("A sectioned page"),
            stats: {
              atime: new Date(),
            },
          };

          console.log(page.sections[1]);

          // add page to metalsmith object
          files[fileName] = page;
        });

        done();
      });
  };
}

module.exports = plugin;
