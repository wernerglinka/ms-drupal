const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--geomap]=
    id,
    field_map_center,
    field_markers,
    field_zoom,
    field_map_height
`;
