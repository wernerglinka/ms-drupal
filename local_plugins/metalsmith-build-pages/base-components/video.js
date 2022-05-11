/**
 * video
 * Build the base component video which inlcudes simple key/value pairs.
 */

const video = function(allParagraphs, baseComponents) {
  const key = "video";
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

module.exports = video;
