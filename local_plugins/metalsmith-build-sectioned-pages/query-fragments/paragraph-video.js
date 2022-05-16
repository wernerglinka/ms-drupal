const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--video]=
    id,
    field_id,
    field_v_src
    field_tn,
    field_aspect_ratio,
    field_caption
`;
