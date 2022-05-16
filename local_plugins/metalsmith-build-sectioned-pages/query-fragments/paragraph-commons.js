const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--commons]=
    id,
    field_background_color,
    field_has_bottom_margin,
    field_has_bottom_padding,
    field_has_top_margin,
    field_has_top_padding,
    field_in_container,
    field_is_animated,
    field_is_disabled,
    field_target_id,
    field_target_type,
    field_target_url,
    field_text,
    field_ctas
`;
