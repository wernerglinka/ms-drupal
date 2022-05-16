/**
 * text
 * Build the base component text object.
 * @param {Object} allParagraphs
 * @param {Object} baseComponents
 * @returns {Object}
 * @example
   {
    "text": {
      "title": "",
      "header": "",
      "sub_title": "",
      "prose": "",
    }
 */

const text = function(allParagraphs, baseComponents) {
  const key = "text";
  const thisBaseComponent = {};
  // Match base component ID with a paragraph ID
  allParagraphs.forEach(paragraph => {
    if (paragraph.id === baseComponents[key].id) {
      Object.keys(paragraph.attributes).forEach(pkey => {
        // Object.assign(thisBaseComponent, { [pkey.replace("field_", "")]: paragraph.attributes[pkey] });
        if (typeof paragraph.attributes[pkey] === "object" && paragraph.attributes[pkey] !== null) {
          // An object indicates a formatted text field. We are only using the value field
          Object.assign(thisBaseComponent, { [pkey.replace("field_", "")]: paragraph.attributes[pkey].value });
        } else {
          // Other fields are key/value pairs
          Object.assign(thisBaseComponent, { [pkey.replace("field_", "")]: paragraph.attributes[pkey] });
        }
      });
    }
  });
  return { [key]: thisBaseComponent };
};

module.exports = text;
