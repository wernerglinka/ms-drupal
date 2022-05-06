/**
 * lottie
 * Build the base component lottie which inlcudes simple key/value pairs.
 */

const lottie = function(paragraph, obj, key, fieldKey) {
  Object.assign(obj[key], { [fieldKey.replace("field_", "")]: paragraph.attributes[fieldKey] });
};

module.exports = lottie;
