const hexToRgba = require("./hex-to-rgba");
const isColorDark = require("./is-color-dark");
const toCamelCase = require("./to-camel-case");
const baseComponentsList = require("./base-components");

/**
 * getPageSections
 * Build all page sections from the allParagraphs list
 *
 * @param {Object} thisPage - the page data
 * @param {Object} allParagraphs - the list of all paragraphs
 * @returns {Object} - the page sections
 */
const getPageSections = function(thisPage, allParagraphs) {
  const allSections = [];

  // Get all paragraph sections
  // if allParagraphs is null then we got a page without sections
  const allSectionData = allParagraphs && allParagraphs.filter(section => section.type.includes("paragraph--section_"));

  // Get the page sections
  // page sections are implemented as Drupal paragraphs they can be accessed via included.relationships
  const pageSectionsArray = thisPage.relationships.field_sections.data;

  pageSectionsArray.forEach(section => {
    // Get the section name
    const thisSectionName = section.type.replace("paragraph--section_", "");
    // Get the component ID
    const thisSectionID = section.id;

    // Get section fields and base component IDs
    const sectionData = allSectionData.filter(thisSectionData => thisSectionData.id === thisSectionID);

    // Build a normalized section fields object
    const sectionFields = {};
    Object.keys(sectionData[0].attributes).forEach(key => {
      sectionFields[key.replace("field_", "")] = sectionData[0].attributes[key];
    });

    // Build a normalized base component object which includes the object ID.
    // We'll use the ob ject ID to get the base component data
    const baseComponents = {};
    Object.keys(sectionData[0].relationships).forEach(key => {
      if (key.startsWith("field_")) {
        baseComponents[key.replace("field_", "")] = sectionData[0].relationships[key].data;
      }
    });

    /* TODO
     *  put all base components that are not array into arrays so we can streamline the field evaluation <<<<<<<<<<<<<<<<<<<<<<<<<
     */

    // get the section base components data
    const sectionBaseComponentsData = {};
    Object.keys(baseComponents).forEach(key => {
      // if baseComponents[key] is an array we loop over it and create a new object for each item
      // for example for multiple CTAs
      if (Array.isArray(baseComponents[key])) {
        sectionBaseComponentsData[key] = [];
        let temp = {};
        baseComponents[key].forEach(baseComponentObject => {
          // Match base component ID with a paragraph ID
          allParagraphs.forEach(paragraph => {
            if (paragraph.id === baseComponentObject.id) {
              // Normalize the keys and build a temporary object
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
        // Match base component ID with a paragraph ID
        allParagraphs.forEach(paragraph => {
          if (paragraph.id === baseComponents[key].id) {
            Object.keys(paragraph.attributes).forEach(pkey => {
              // Special case for commons base component. We insert common fields in the section
              // fields rather then the base component fields
              if (key === "commons") {
                // commons fields are not objects, they are key/value pairs
                baseComponentsList[key](paragraph, sectionFields, key, pkey);
              } else {
                // while other fields are ob jects with key/value properties
                baseComponentsList[key](paragraph, sectionBaseComponentsData, key, pkey);
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
      component: thisSectionName,
      ...sectionFields,
      ...sectionBaseComponentsData,
    });
  });

  return toCamelCase(allSections);
};

module.exports = getPageSections;
