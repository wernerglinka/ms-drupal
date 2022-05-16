const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--ctas]=
    id,
    field_button_style,
    field_is_button,
    field_is_external,
    field_label,
    field_url
`;
