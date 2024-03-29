import React, { useState, useEffect, useRef } from 'react';
import CONSTANTS from '../constants/constants';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../sass/mapbox.scss';
import ReactMapGL from 'react-map-gl';
import { MAPBOX_API_KEY } from '../appConfiguration';
import CustomMarkerMapbox from "./CustomMarkerMapbox";
import {
  zoomToIncludeMarkers
} from '../utils/mapboxAPIUtils';

const { DEFAULT_MAP_DESTINATION } = CONSTANTS;

mapboxgl.accessToken = MAPBOX_API_KEY;
const mapboxApiKey = MAPBOX_API_KEY

const defaultViewport = {
  latitude: DEFAULT_MAP_DESTINATION.CENTER[0],
  longitude: DEFAULT_MAP_DESTINATION.CENTER[1],
  zoom: DEFAULT_MAP_DESTINATION.ZOOM
};
const mapStyle = {
  width: '100%',
  height: '100%'
}

const MapboxCanvas = ({
  positions, selectedMarkerId, searchPlace
}) => {

  const [mapboxMap, setMapboxMap] = useState(null);
  const [viewport, setViewport] = useState(defaultViewport);
  const [lng, setLng] = useState(defaultViewport.longitude);
  const [lat, setLat] = useState(defaultViewport.latitude);
  const [zoom, setZoom] = useState(defaultViewport.zoom);

  const [markersArray, setMarkersArray] = useState([]);

  useEffect(() => {
    if (!mapboxMap) {
      return
    }
    console.log(`Mapbox map initialized`)

    // Add navigation control (the +/- zoom buttons)
    mapboxMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

    mapboxMap.on('move', () => {
      setLng(mapboxMap.getCenter().lng.toFixed(4));
      setLat(mapboxMap.getCenter().lat.toFixed(4));
      setZoom(mapboxMap.getZoom().toFixed(2));
    });

    // Clean up on unmount
    //return () => mapboxMap.remove();
  }, [mapboxMap]);

  useEffect(() => {
    console.log(`Viewport changed`)
  }, [viewport]);

  const addMarkerToMap = (markerId, latitude, longitude) => {
    const marker = {
      id: markerId,
      latitude,
      longitude,
      isSelected: false,
    }
    const updatedMarkersArray = [...markersArray, marker];
    setMarkersArray(updatedMarkersArray);
  };

  const addMarkersToMap = (positions) => {
    const newMarkersArray = [];

    (positions || []).forEach(function (position) {
      newMarkersArray.push(position);
    });
    setMarkersArray(newMarkersArray);
  };

  useEffect(() => {
    addMarkersToMap(positions);
  }, [positions]);

  useEffect(() => {
    if (!mapboxMap) {
      return
    }

    zoomToIncludeMarkers(mapboxMap, markersArray);
  }, [markersArray, mapboxMap]);

  useEffect(() => {
    if (!searchPlace) {
      return
    }
    const { id, latitude, longitude } = searchPlace
    addMarkerToMap(id, latitude, longitude);
  }, [searchPlace]);

  const selectedMarker = useRef(null);
  useEffect(() => {
    // marker is already selected
    if (selectedMarker.current === selectedMarkerId) {
      return;
    }

    const updatedMarkers = markersArray.map(marker => {
      const updatedMarker = { ...marker }
      updatedMarker.isSelected = updatedMarker.id === selectedMarkerId ? true : false;
      return updatedMarker
    })

    // updates selected marker reference
    selectedMarker.current = selectedMarkerId;
    // updates marrkers array
    setMarkersArray(updatedMarkers)
  }, [selectedMarkerId, positions]);

  return (
    <>
      <ReactMapGL
        mapboxApiAccessToken={mapboxApiKey}
        initialViewState={viewport}
        style={mapStyle}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        ref={ref => ref && setMapboxMap(ref.getMap())}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <div className='sidebarStyle'>
          <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
        {
          markersArray.map((marker, index) => {
            return (
              <CustomMarkerMapbox
                key={`marker - ${index} `}
                longitude={marker.longitude}
                latitude={marker.latitude}
                isSelected={marker.isSelected}
                index={index}
              />
            )
          })
        }
      </ReactMapGL>
    </>
  );
};

export default MapboxCanvas;
