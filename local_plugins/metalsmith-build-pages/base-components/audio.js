/**
 * audio
 * Build the base component audio object.
 * @param {Object} allParagraphs
 * @param {Object} baseComponents
 * @returns {Object}
 * @example
 * {
 * "audio": {
 *   "aspectRatio": "",
 *   "bgIMage": "",
 *   "caption": "",
 *   "mpeg": "",
 *   "ogg": "",
 * }
 */

const audio = function(allParagraphs, baseComponents) {
  const key = "audio";
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

module.exports = audio;
