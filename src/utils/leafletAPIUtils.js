
/* 
  * Remove a single marker from the map.
  * 
  * @param {number} index - the marker index to be removed
  * @param {Object} map - Leaflet Map object
  * 
  */
export const removeMarker = (index, map) => {
  map.eachLayer((layer) => {
    if (layer.options && layer.options.pane === "markerPane") {
      if (layer.options.uniceid === index) {
        map.removeLayer(layer);
      }
    }
  });
}


/* 
 * Remove all markers from the map.
 * 
 * @param {Object} map - Leaflet Map object
 * 
 */
export const removeAllMarkers = (map) => {
  map.eachLayer((layer) => {
    if (layer.options && layer.options.pane === "markerPane") {
      map.removeLayer(layer);
    }
  });
}

/* 
 * Establish new map bounds to fit all markers passed as input parameters in the viewport.
 * 
 * @param {Object} map - Leaflet maps object
 * @param {Array} markers - Leaflet markers array
 * 
*/
export const zoomToIncludeMarkers = (map, markers = []) => {
  if (markers.length === 0) {
    return;
  }

  const markerGroup = markers.map(marker => L.marker([marker.latitude, marker.longitude]));
  const group = new L.featureGroup(markerGroup);
  map.fitBounds(group.getBounds());
};


