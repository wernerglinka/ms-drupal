/**
 * video
 * Build the base component video which inlcudes simple key/value pairs.
 */

const video = function(paragraph, obj, key, fieldKey) {
  Object.assign(obj[key], { [fieldKey.replace("field_", "")]: paragraph.attributes[fieldKey] });
};

module.exports = video;
