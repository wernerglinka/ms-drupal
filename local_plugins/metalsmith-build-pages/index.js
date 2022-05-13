const fetch = require("node-fetch");
const commonTags = require("common-tags");
const buildInitialPageObject = require("./get-page-object");
const buildPageSections = require("./get-page-sections");

// query fragments
const includeFragment = require("./query-fragments/include");
const sectionedPageFragment = require("./query-fragments/sectioned-page");
const sectionImageBanner = require("./query-fragments/section-image-banner");
const sectionIntroFragment = require("./query-fragments/section-intro");
const sectionMediaFragment = require("./query-fragments/section-media");
const sectionCtaBannerFragment = require("./query-fragments/section-cta-banner");
const sectionMapFragment = require("./query-fragments/section-map");
const paragraphCommonsFragment = require("./query-fragments/paragraph-commons");
const paragraphTextFragment = require("./query-fragments/paragraph-text");
const paragraphCtasFragment = require("./query-fragments/paragraph-ctas");
const paragraphAudioFragment = require("./query-fragments/paragraph-audio");
const paragraphImageFragment = require("./query-fragments/paragraph-image");
const paragraphLottieFragment = require("./query-fragments/paragraph-lottie");
const paragraphVideoFragment = require("./query-fragments/paragraph-video");
const paragraphGeomapFragment = require("./query-fragments/paragraph-geomap");

const getPageDataQuery = (serverURL, page) => {
  const query = commonTags.oneLineTrim`
    ${includeFragment}
    ${sectionedPageFragment}
    ${sectionImageBanner}
    ${sectionIntroFragment}
    ${sectionMediaFragment}
    ${sectionCtaBannerFragment}
    ${sectionMapFragment}
    ${paragraphCommonsFragment}
    ${paragraphTextFragment}
    ${paragraphCtasFragment}
    ${paragraphAudioFragment}
    ${paragraphImageFragment}
    ${paragraphLottieFragment}
    ${paragraphVideoFragment}
    ${paragraphGeomapFragment}
  `;
  return serverURL + page + query;
};

/**
 * Metalsmith plugin to build pages from api data
 */
function plugin() {
  return (files, metalsmith, done) => {
    /**
     * Get the page data from the api
     * The site content is managed by a Drupal9 site and the content is fetched via the site JSON API
     */
    const serverUrl = "https://dev-dorka.pantheonsite.io";
    const pageURL = "/jsonapi/node/sectioned_page";
    const sectionedPagesRequest = getPageDataQuery(serverUrl, pageURL);
    // get data from the DORKA server API
    fetch(sectionedPagesRequest)
      .then(response => response.json())
      .then(json => {
        // Get all pages data. Page data includes the page id which we need to get the page sections
        const pageData = json.data.filter(thisPage => thisPage.type.includes("sectioned_page"));
        // Get all paragraphs. All sections and base components are paragraphs. This list will
        // be used to get the page sections and then the section base components data
        const allParagraphs = json.included;

        // Build all pages
        pageData.forEach(thisPage => {
          // get the page name
          const pageName = thisPage.attributes.title.toLowerCase().replace(/\s/g, "-");

          console.log(pageName);

          // Build the initial page object
          // includes the page metadata and template
          const pageObj = buildInitialPageObject(thisPage);

          // Build the page sections
          const pageSections = buildPageSections(thisPage, allParagraphs);

          // Build the final page object to be added to the files object
          const page = {
            ...pageObj,
            sections: pageSections,
            contents: Buffer.from("A sectioned page"),
            stats: {
              atime: new Date(),
            },
          };

          // This is the key for the page object
          const fileName = `${pageName}.md`;

          // Add page to metalsmith object
          files[fileName] = page;
        });

        done();
      });
  };
}

module.exports = plugin;
