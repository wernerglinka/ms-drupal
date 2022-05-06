const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--lottie]=
    id,
    field_l_src,
    field_autoplay,
    field_loop
`;
