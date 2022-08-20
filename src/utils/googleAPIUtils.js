import { v4 as uuidv4 } from 'uuid';

/* 
  * PLACES API
  * Parses a place object from Google API into an object with the following properties
  * 
  * @param {Object} place - object with id, name, latitude, longitude, address properties
  * 
  * @returns {Function} place - Parsed place object
  *  
  */
export const parsePlace = place => {
  const parsedPlace = {
    id: uuidv4(),
    name: place.name,
    latitude: place.geometry.location.lat(),
    longitude: place.geometry.location.lng()
  };

  parsedPlace.address = place.formatted_address;

  return parsedPlace;
};

/* 
  * PLACES API
  * Initialize HTML Element listener responsible for displaying Place API results
  * 
  * @param {Object} inputElement - HTML Element
  * @param {Object} maps - Google Maps object
  * @param {Function} callback - Callback function for post listener creation actions
  *  
  */
export const initAutocompleteSearchPlacesBox = (inputElement, maps, callback) => {
  // Create the search box and link it to the UI element.
  const searchBox = new maps.places.SearchBox(inputElement);

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  const autocompleteListener = searchBox.addListener('places_changed', function () {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }
    if (places.length > 1) {
      console.warn('Multiple search results but only the first one is being considered.');
    }
    // only most relevant (first) match form search is considered
    const place = places[0];

    if (!place.geometry) {
      console.log('Returned place contains no geometry');
      return;
    }

    const parsedPlace = parsePlace(place);
    callback(parsedPlace);
  });
};

/* 
  * MAPS API
  * Return map bounds based on list of places
  * 
  * @param {Object} maps - Google Maps object
  * @param {Array} markers - Array of Markers
  * 
  * @returns {Object} bounds - Google LatLngBounds object
  * 
  */
const getMapBounds = (maps, markers) => {
  const bounds = new maps.LatLngBounds();

  for (var key in markers) {
    const pos = markers[key].getPosition();
    // console.log(`Marker Key ${key}: ${JSON.stringify(pos)}`);
    bounds.extend(pos);
  }

  return bounds;
};

/* 
  * MAPS API
  *  Re-center map when resizing the window
  * 
  * @param {Object} map - Google Map object
  * @param {Object} maps - Google Maps object
  * @param {Object} bounds - Google LatLngBounds object
  * 
  */
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

/* 
  * MAPS API
  * Adjusts zoom when there is just one marker on the map
  * 
  * @param {Array} markers - Array of Markers
  * @param {Object} maps - Google Maps object
  *  
  */
const setZoomForOneMarker = (markers, map) => {
  if (markers.length === 1) {
    let newZoom;
    newZoom = map.getZoom() - 8;
    newZoom = newZoom < 0 ? 0 : newZoom;
    map.setZoom(newZoom);
  }
};

/* 
  * MAPS API
  * Establish new map bounds to fit all markers passed as input parameters in the viewport.
  * 
  * @param {Object} map - Google Map object
  * @param {Object} maps - Google Maps object
  * @param {Array} markers - Array of Markers 
  * 
  */
export const zoomToIncludeMarkers = (maps, map, markers = []) => {
  if (markers.length === 0) {
    return;
  }
  // Get bounds by our places
  const bounds = getMapBounds(maps, markers);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);

  // special zoom if only one marker
  setZoomForOneMarker(markers, map);
};

/* 
  * MAPS API
  * Removes all markers from the map it is included.
  * 
  * @param {Array} markers - Array of Markers 
  * 
  */
export const clearMarkers = (markers) => {
  (markers || []).forEach(function (marker) {
    marker.setMap(null);
  });
  markers.length = 0;
};

/* 
  * MAPS API
  * Removes all markers from the map it is included.
  * 
  * @param {Array} markers - Array of Markers 
  * @param {String} markerIdToRemove - Marker id to remove from the array 
  * 
  */
export const removeMarker = (markers, markerIdToRemove) => {
  let markerIndex;
  (markers || []).forEach(function (marker, index) {
    if (markerIdToRemove === marker.id) {
      marker.setMap(null);
      markerIndex = index;
    }
  });

  if (markerIndex !== undefined) {
    markers.splice(markerIndex, 1);
  }
};
