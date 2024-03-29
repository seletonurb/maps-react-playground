import React, { useState, useEffect, useRef } from 'react';
import CONSTANTS from '../constants/constants';
import MAP_CONSTANTS from '../constants/mapConstants';
import GoogleMapReact from 'google-map-react';
import GoogleMarkerFactory from '../services/GoogleMarkerFactory';
import { GOOGLE_MAPS_API_KEY } from '../appConfiguration';
import {
  zoomToIncludeMarkers,
  clearMarkers
} from '../utils/googleAPIUtils';
import { generateTimestampId } from '../utils/common';

const { DEFAULT_MAP_DESTINATION } = CONSTANTS;
const { MARKER_TYPES } = MAP_CONSTANTS

const GoogleMapCanvas = ({
  children, positions, selectedMarkerId, onMapsLoaded, props
}) => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [markersArray, setMarkersArray] = useState([]);

  const addMarkerToMap = (maps, map, latitude, longitude, textLabel, markerId, markerType) => {
    const id = markerId || generateTimestampId(); // if id does not exist, generates a random marker id based on a timestamp
    const marker = GoogleMarkerFactory.buildMapMarker(maps, map, latitude, longitude, textLabel, id, markerType);
    return marker;
  };

  const addMarkersToMap = (maps, map, positions) => {
    const updatedMarkersArray = [...markersArray];
    clearMarkers(updatedMarkersArray); // clear map markers if they exist
    (positions || []).forEach(function (position, index) {
      const {
        latitude, longitude, textLabel, id
      } = position;
      const marker = addMarkerToMap(maps, map, latitude, longitude, textLabel || index + 1, id);
      updatedMarkersArray.push(marker);
    });
    setMarkersArray(updatedMarkersArray);
  };

  useEffect(() => {
    if (!(maps && map) || !positions) {
      return;
    }
    addMarkersToMap(maps, map, positions);
  }, [maps, map, positions]);

  useEffect(() => {
    if (!(maps && map && markersArray)) {
      return;
    }
    zoomToIncludeMarkers(maps, map, markersArray);
  }, [maps, map, markersArray]);

  const selectedMarker = useRef(null);
  useEffect(() => {
    // marker is already selected
    if (selectedMarker.current === selectedMarkerId) {
      return;
    }
    console.log(`New selected id: ${selectedMarkerId}`);

    // unselects current selection
    let markerIndex = markersArray.findIndex(marker => marker.id === selectedMarker.current);
    if (markerIndex !== -1) {
      const curentMarker = markersArray[markerIndex]
      const markerIcon = GoogleMarkerFactory.getMarkerIcon(curentMarker.icon, MARKER_TYPES.NORMAL);
      curentMarker.setIcon(markerIcon);
    }

    // selects new marker
    markerIndex = markersArray.findIndex(marker => marker.id === selectedMarkerId);
    if (markerIndex !== -1) {
      const curentMarker = markersArray[markerIndex]
      const markerIcon = GoogleMarkerFactory.getMarkerIcon(curentMarker.icon, MARKER_TYPES.SELECTED);
      curentMarker.setIcon(markerIcon);
    }
    selectedMarker.current = selectedMarkerId;
  }, [selectedMarkerId, markersArray]);

  const searchMarkerId = useRef(undefined);

  const initializeMaps = (map, maps) => {
    setMap(map);
    setMaps(maps);
    onMapsLoaded(maps); // initialize maps for reference outside this component

  };

  const onMapsload = ({ map, maps }) => {
    // console.log(map, maps);
    initializeMaps(map, maps);
  };

  return (
    <>
      <GoogleMapReact
        id="map_canvas-container"
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY, libraries: 'places' }}
        defaultCenter={DEFAULT_MAP_DESTINATION.CENTER}
        defaultZoom={DEFAULT_MAP_DESTINATION.ZOOM}
        options={{ mapTypeControl: true }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onMapsload}
        {...props}
      >
        {children}
      </GoogleMapReact>
    </>
  );
};

export default GoogleMapCanvas;
