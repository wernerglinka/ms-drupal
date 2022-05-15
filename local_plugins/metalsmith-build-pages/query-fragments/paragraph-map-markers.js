const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--map_markers]=
    id,
    field_coordinates,
    field_marker_body,
    field_marker_link,
    field_marker_title
`;
