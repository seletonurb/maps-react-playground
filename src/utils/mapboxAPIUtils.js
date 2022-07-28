import mapboxgl from 'mapbox-gl';

/* 
 * Establish new map bounds to fit all markers passed as input parameters in the viewport.
 * 
 * @param {Object} map - mapboxgl maps object
 * @param {Array} markers - Mapbox markers array
 * 
*/
export const zoomToIncludeMarkers = (map, markers = []) => {
  if (markers.length === 0) {
    return;
  }

  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(function (marker) {
    const lngLat = new mapboxgl.LngLat(marker.longitude, marker.latitude);
    bounds.extend(lngLat);
  });

  map.fitBounds(bounds,
    { padding: 100, duration: 1000 });
};
