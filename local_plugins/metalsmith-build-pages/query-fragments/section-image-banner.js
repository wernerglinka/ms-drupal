const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--section_image_banner]=
    id,
    field_commons,
    field_text,
    field_has_ctas,
    field_ctas,
    field_image,
`;
