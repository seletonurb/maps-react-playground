import React, { useState, useEffect, useRef } from 'react';
import CONSTANTS from '../constants/constants';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../sass/mapbox.scss';
import ReactMapGL, { Marker } from 'react-map-gl';
import { MAPBOX_API_KEY } from '../appConfiguration';
import SVGPin from "./SVGPin";
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

const CustomMarker = ({ index, latitude, longitude }) => {
  return (

    <Marker
      key={`marker-${index}`}
      longitude={longitude}
      latitude={latitude}>
      <span className="pin">
        <b>{index + 1}</b>
      </span>
      <SVGPin size={20} />
    </Marker>
  )
};

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
    console.log(`Map initialized`)

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

  const addMarkerToMap = (latitude, longitude, markerId) => {
    const marker = {
      latitude,
      longitude,
      markerId
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
    addMarkerToMap(searchPlace);
  }, [searchPlace]);

  const selectedMarker = useRef(null);
  useEffect(() => {
    // marker is already selected
    if (selectedMarker.current === selectedMarkerId) {
      return;
    }
    console.log(`New selected id: ${selectedMarkerId} `);

  }, [selectedMarkerId, markersArray]);

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
              <CustomMarker
                key={`marker - ${index} `}
                longitude={marker.longitude}
                latitude={marker.latitude}
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
