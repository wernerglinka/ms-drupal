/**
 * audio
 * Build the base component audio which inlcudes simple key/value pairs.
 */

const audio = function(paragraph, obj, key, fieldKey) {
  Object.assign(obj[key], { [fieldKey.replace("field_", "")]: paragraph.attributes[fieldKey] });
};

module.exports = audio;
