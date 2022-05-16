/**
 * image
 * Build the base component image object.
 * @param {Object} allParagraphs
 * @param {Object} baseComponents
 * @returns {Object}
 *
 * @example
 * {
 *  "image": {
 *   "src": "https://res.cloudinary.com/djd0plux8/image/upload/v1652291609/drupal-backend/zeche-nordstern_hotwoo.jpg",
 *   "alt": "Zeche Nordstern",
 *   "aspectRatio": "38",
 *  }
 */

const image = function(allParagraphs, baseComponents) {
  const key = "image";
  const thisBaseComponent = {};
  // Match base component ID with a paragraph ID
  allParagraphs.forEach(paragraph => {
    if (paragraph.id === baseComponents[key].id) {
      Object.keys(paragraph.attributes).forEach(pkey => {
        Object.assign(thisBaseComponent, { [pkey.replace("field_", "")]: paragraph.attributes[pkey] });
      });
    }
  });

  return { [key]: thisBaseComponent };
};

module.exports = image;
