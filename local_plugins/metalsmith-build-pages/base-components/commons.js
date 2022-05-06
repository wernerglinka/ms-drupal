const hexToRgba = require("../hex-to-rgba");
const isColorDark = require("../is-color-dark");

/**
 * commons
 * Build the base component commons which inlcudes boolen, a color object and simple key/value pairs.
 */

const commons = function(paragraph, sectionFields, key, fieldKey) {
  if (typeof paragraph.attributes[fieldKey] === "object" && paragraph.attributes[fieldKey] !== null) {
    // The color field is an object with the color value in hex and the opacity
    if (paragraph.attributes[fieldKey].color) {
      // convert the hex color to rgb
      const rgba = hexToRgba(paragraph.attributes[fieldKey].color, paragraph.attributes[fieldKey].opacity);
      Object.assign(sectionFields, { [fieldKey.replace("field_", "")]: rgba });
      // check if color is too dark and add new field 'colorIsDark'
      Object.assign(sectionFields, { colorIsDark: isColorDark(rgba) });
    } else {
      Object.assign(sectionFields, { [fieldKey.replace("field_", "")]: paragraph.attributes[fieldKey] });
    }
  } else {
    // All other common fields are just a key/value pair
    Object.assign(sectionFields, { [fieldKey.replace("field_", "")]: paragraph.attributes[fieldKey] || "" });
  }
};

module.exports = commons;
