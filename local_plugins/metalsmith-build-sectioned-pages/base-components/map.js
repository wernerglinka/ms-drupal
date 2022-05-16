/**
 * map
 * Build the base component geomap object.
 * @param {Object} allParagraphs
 * @param {Object} baseComponents
 * @returns {Object}
 * @example
 * "map": {
      mapCenter: '51.499998,7.499998',
      mapHeight: 400,
      zoom: 10,
      markers: [
        {
          coordinates: '51.5526994559,7.06721973112',
          markerBody: 'Schalke 04 plays their football here',
          markerLink: {
            url: 'https://www.schalke04.de/',
            title: 'Schalke 04',
          },
          markerTitle: 'Veltins Arena'
        },
        ...
      ]
    }
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

  const normalizedBaseComnponent = {
    mapCenter: thisBaseComponent.map_center.latlon,
    mapHeight: thisBaseComponent.map_height,
    zoom: thisBaseComponent.zoom,
    markers: thisBaseComponent.markers.map(thisMarker => {
      return {
        coordinates: thisMarker.coordinates.latlon,
        markerBody: thisMarker.marker_body.value,
        markerLink: {
          url: thisMarker.marker_link.uri,
          title: thisMarker.marker_link.title,
        },
        markerTitle: thisMarker.marker_title,
      };
    }),
  };

  return { [key]: normalizedBaseComnponent };
};

module.exports = map;
