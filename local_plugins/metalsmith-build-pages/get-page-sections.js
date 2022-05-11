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

  // Get the sections type and ID for this page
  // page sections are implemented as Drupal paragraphs they can be accessed via included.relationships
  const pageSectionsArray = thisPage.relationships.field_sections.data;

  // Get all paragraph sections data for this site
  const allSectionData = allParagraphs && allParagraphs.filter(section => section.type.includes("paragraph--section_"));

  // process the page sections
  // for each section in this page, loop over all sections in the site and find the matching section base components
  pageSectionsArray.forEach(section => {
    // Get the section name
    const thisSectionName = section.type.replace("paragraph--section_", "");

    // Get the section ID. We'll use this to get the base components for this section
    const thisSectionID = section.id;

    // Get the base component IDs for this section
    const sectionData = allSectionData.filter(thisSectionData => thisSectionData.id === thisSectionID);

    // Build object with the simple fields for each section
    const sectionFields = {};
    Object.keys(sectionData[0].attributes).forEach(key => {
      sectionFields[key.replace("field_", "")] = sectionData[0].attributes[key];
    });

    // Build a base component object which includes the object ID.
    // We'll use the object ID to get the base component data
    const baseComponents = {};
    Object.keys(sectionData[0].relationships).forEach(key => {
      if (key.startsWith("field_")) {
        baseComponents[key.replace("field_", "")] = sectionData[0].relationships[key].data;
      }
    });

    // get the section base components data
    const sectionBaseComponentsData = {};
    Object.keys(baseComponents).forEach(key => {
      const thisBaseComponent = baseComponentsList[key](allParagraphs, baseComponents);
      Object.assign(sectionBaseComponentsData, thisBaseComponent);
    });

    // a single sections object
    allSections.push({
      component: thisSectionName,
      ...sectionFields,
      ...sectionBaseComponentsData,
    });
  });

  console.log(toCamelCase(allSections));

  return toCamelCase(allSections);
};

module.exports = getPageSections;
