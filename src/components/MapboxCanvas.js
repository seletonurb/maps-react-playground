import React, { useState, useEffect, useRef } from 'react';
import CONSTANTS from '../constants/constants';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../sass/mapbox.scss';
import MarkerFactory from '../services/MarkerFactory';
import { MAPBOX_API_KEY } from '../appConfiguration';

const { DEFAULT_MAP_DESTINATION } = CONSTANTS;

// Example token from https://github.com/mapbox/mapbox-react-examples
mapboxgl.accessToken = MAPBOX_API_KEY;
const mapboxApiKey = mapboxgl.accessToken

const MapboxCanvas = ({
  positions, selectedMarkerId
}) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(CONSTANTS.DEFAULT_MAP_DESTINATION.CENTER[1]);
  const [lat, setLat] = useState(CONSTANTS.DEFAULT_MAP_DESTINATION.CENTER[0]);
  const [zoom, setZoom] = useState(CONSTANTS.DEFAULT_MAP_DESTINATION.ZOOM);

  const [mapboxMap, setMapboxMap] = useState(null);

  // Initialize Mapbox when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    setMapboxMap(mapboxMap)
    // Clean up on unmount
    return () => map.remove();
  }, []);

  const [markersArray, setMarkersArray] = useState([]);

  const addMarkerToMap = (latitude, longitude, textLabel, markerId, markerType) => {
    // // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
      .setLngLat([12.554729, 55.70651])
      .addTo(mapboxMap);
  };

  const addMarkersToMap = (positions) => {
    const updatedMarkersArray = [...markersArray];
    MarkerFactory.clearMarkers(updatedMarkersArray); // clear map markers if they exist
    (positions || []).forEach(function (position, index) {
      const {
        latitude, longitude, textLabel, id
      } = position;
      const marker = addMarkerToMap(latitude, longitude, textLabel || index + 1, id);
      updatedMarkersArray.push(marker);
    });
    setMarkersArray(updatedMarkersArray);
  };

  useEffect(() => {
    if (!(mapContainerRef.current) || !positions) {
      return;
    }
    //addMarkersToMap(positions);
  }, [mapContainerRef.current, positions]);

  const selectedMarker = useRef(null);
  useEffect(() => {
    // marker is already selected
    if (selectedMarker.current === selectedMarkerId) {
      return;
    }
    console.log(`New selected id: ${selectedMarkerId}`);

  }, [selectedMarkerId, markersArray]);

  return (
    <>
      <div>
        <div className='sidebarStyle'>
          <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
        <div className='map-container' ref={mapContainerRef} />
      </div>
    </>
  );
};

export default MapboxCanvas;
