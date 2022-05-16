const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--section_intro]=
    id,
    field_has_ctas,
    field_commons,
    field_text,
    field_ctas
`;
