const commonTags = require("common-tags");

/**
 * query fragment lists all scarce fields for a sectioned page
 */
module.exports = commonTags.oneLineTrim`
  &fields[node--sectioned_page]=
    id,
    title,
    field_sections,
    field_layout,
    field_body_classes,
    field_meta_title,
    field_meta_description,
    field_meta_image,
    field_canonical_overwrite
`;
