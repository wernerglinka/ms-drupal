/**
 * geo_map
 * Build the base component image which inlcudes simple key/value pairs.
 */

const map = function(allParagraphs, baseComponents) {
  const key = "map";
  const thisBaseComponent = {};

  // Match base component ID with a paragraph ID
  allParagraphs.forEach(paragraph => {
    if (paragraph.id === baseComponents[key].id) {
      Object.keys(paragraph.attributes).forEach(pkey => {
        Object.assign(thisBaseComponent, { [pkey.replace("field_", "")]: paragraph.attributes[pkey] });
      });

      // get the array of marker IDs
      const allMapMarkers = paragraph.relationships.field_markers.data;

      const mapMarkers = [];
      allMapMarkers.forEach(marker => {
        const thisMarker = {};
        allParagraphs.forEach(paragraph => {
          if (paragraph.id === marker.id) {
            Object.keys(paragraph.attributes).forEach(pkey => {
              Object.assign(thisMarker, { [pkey.replace("field_", "")]: paragraph.attributes[pkey] });
            });
          }
        });
        mapMarkers.push(thisMarker);
      });
      Object.assign(thisBaseComponent, { markers: mapMarkers });
    }
  });

  console.log(thisBaseComponent);
  return { [key]: thisBaseComponent };
};

module.exports = map;
