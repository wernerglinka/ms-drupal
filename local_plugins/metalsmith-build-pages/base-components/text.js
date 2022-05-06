/**
 * text
 * Build the base component text which inlcudes objects and simple key/value pairs.
 */

const text = function(paragraph, obj, key, fieldKey) {
  if (typeof paragraph.attributes[fieldKey] === "object" && paragraph.attributes[fieldKey] !== null) {
    // An object indicates a formatted text field. We are only using the value field
    Object.assign(obj[key], { [fieldKey.replace("field_", "")]: paragraph.attributes[fieldKey].value });
  } else {
    // Other fields are key/value pairs
    Object.assign(obj[key], { [fieldKey.replace("field_", "")]: paragraph.attributes[fieldKey] });
  }
};

module.exports = text;
