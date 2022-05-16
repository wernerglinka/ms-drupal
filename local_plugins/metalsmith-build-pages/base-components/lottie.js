/**
 * lottie
 * Build the base component lottie object.
 * @param {Object} allParagraphs
 * @param {Object} baseComponents
 * @returns {Object}
 * @example
 * {
 * "lottie": {
    "l_src": "",
    "autoplay": "",
    "loop": "",
   }
 */

const lottie = function(allParagraphs, baseComponents) {
  const key = "lottie";
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

module.exports = lottie;
