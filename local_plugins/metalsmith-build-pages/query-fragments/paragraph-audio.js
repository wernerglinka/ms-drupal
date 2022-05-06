const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--audio]=
    id,
    field_bg_image,
    field_aspect_ratio,
    field_caption,
    field_mpeg,
    field_ogg
`;
