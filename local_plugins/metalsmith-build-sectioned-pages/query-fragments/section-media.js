const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--section_media]=
    id,
    field_commons,
    field_text,
    field_has_ctas,
    field_ctas,
    field_is_reverse,
    field_media_type,
    field_audio,
    field_icon,
    field_image,
    field_lottie,
    field_video,
`;
