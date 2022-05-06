/**
 *  buildInitialPageObject
 *  metadata are fields directly attached to the content type
    therefore they can be accessed via the page attributes
 * @param {Object} thisPage the page object
 * @returns {Object} the initial, normalized page object
 */
const buildInitialPageObject = thisPage => {
  return {
    layout: thisPage.attributes.field_layout,
    bodyClasses: thisPage.attributes.field_body_classes,
    seo: {
      title: thisPage.attributes.field_meta_title,
      description: thisPage.attributes.field_meta_description,
      socialImage: thisPage.attributes.field_meta_image || "",
      canonicalOverwrite: thisPage.attributes.field_canonical_overwrite || "",
    },
  };
};

module.exports = buildInitialPageObject;
