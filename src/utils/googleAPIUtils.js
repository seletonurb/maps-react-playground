import { v4 as uuidv4 } from 'uuid';
/** ******************************PLACES API********************************************* */

/* Parses a place object from Google API into an obejct with the following properties:
   {
    id,
    name,
    latitude,
    longitude,
    address
   };
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

/** ****************************** END PLACES API********************************************* */

/** ******************************MAPS API********************************************* */

// Return map bounds based on list of places
const getMapBounds = (maps, markers) => {
  const bounds = new maps.LatLngBounds();

  for (var key in markers) {
    const pos = markers[key].getPosition();
    // console.log(`Marker Key ${key}: ${JSON.stringify(pos)}`);
    bounds.extend(pos);
  }

  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

const setZoomForOneMarker = (markers, map) => {
  if (markers.length === 1) {
    let newZoom;
    newZoom = map.getZoom() - 8;
    newZoom = newZoom < 0 ? 0 : newZoom;
    map.setZoom(newZoom);
  }
};

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
/** ******************************ENDS MAPS API********************************************* */
