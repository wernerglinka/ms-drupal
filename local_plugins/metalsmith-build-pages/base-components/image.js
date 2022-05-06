/**
 * image
 * Build the base component image which inlcudes simple key/value pairs.
 */

const image = function(paragraph, obj, key, fieldKey) {
  Object.assign(obj[key], { [fieldKey.replace("field_", "")]: paragraph.attributes[fieldKey] });
};

module.exports = image;
