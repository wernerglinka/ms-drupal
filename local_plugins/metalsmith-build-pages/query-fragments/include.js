const commonTags = require("common-tags");

/**
 * query fragment lists all base components of field sections to be included
 */
module.exports = commonTags.oneLineTrim`
?include=
  field_sections.field_commons,
  field_sections.field_text,
  field_sections.field_ctas,
  field_sections.field_audio,
  field_sections.field_image,
  field_sections.field_lottie,
  field_sections.field_video,
  field_sections.field_map
`;
