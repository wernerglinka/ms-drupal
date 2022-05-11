const hexToRgba = require("../hex-to-rgba");
const isColorDark = require("../is-color-dark");

/**
 * commons
 * Build the base component commons which inlcudes boolen, a color object and simple key/value pairs.
 */

const commons = function(allParagraphs, baseComponents) {
  const key = "commons";
  const thisBaseComponent = {};
  // Match base component ID with a paragraph ID
  allParagraphs.forEach(paragraph => {
    if (paragraph.id === baseComponents[key].id) {
      Object.keys(paragraph.attributes).forEach(pkey => {
        // Object.assign(thisBaseComponent, { [pkey.replace("field_", "")]: paragraph.attributes[pkey] });

        if (typeof paragraph.attributes[pkey] === "object" && paragraph.attributes[pkey] !== null) {
          // The color field is an object with the color value in hex and the opacity
          if (paragraph.attributes[pkey].color) {
            // convert the hex color to rgb
            const rgba = hexToRgba(paragraph.attributes[pkey].color, paragraph.attributes[pkey].opacity);
            Object.assign(thisBaseComponent, { [pkey.replace("field_", "")]: rgba });
            // check if color is too dark and add new field 'colorIsDark'
            Object.assign(thisBaseComponent, { colorIsDark: isColorDark(rgba) });
          } else {
            Object.assign(thisBaseComponent, { [pkey.replace("field_", "")]: paragraph.attributes[pkey] });
          }
        } else {
          // All other common fields are just a key/value pair
          Object.assign(thisBaseComponent, { [pkey.replace("field_", "")]: paragraph.attributes[pkey] || "" });
        }
      });
    }
  });
  return { [key]: thisBaseComponent };
};

module.exports = commons;
