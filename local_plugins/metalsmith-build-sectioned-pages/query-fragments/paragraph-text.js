const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[paragraph--text]=
    id,
    field_prose,
    field_header,
    field_sub_title,
    field_title
`;
