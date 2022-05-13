/**
 * geo_map
 * Build the base component image which inlcudes simple key/value pairs.
 */

const map = function(allParagraphs, baseComponents) {
  const key = "map";
  const thisBaseComponent = {};
  // Match base component ID with a paragraph ID
  allParagraphs.forEach(paragraph => {
    if (paragraph.id === baseComponents[key].id) {
      Object.keys(paragraph.attributes).forEach(pkey => {
        console.log(paragraph.attributes[pkey]);
        Object.assign(thisBaseComponent, { [pkey.replace("field_", "")]: paragraph.attributes[pkey] });
      });
    }
  });
  return { [key]: thisBaseComponent };
};

module.exports = map;
