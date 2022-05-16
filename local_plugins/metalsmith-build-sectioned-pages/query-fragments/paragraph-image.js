const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--image]=
    id,
    field_src,
    field_aspect_ratio,
    field_alt
`;
