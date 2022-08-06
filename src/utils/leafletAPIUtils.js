
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

