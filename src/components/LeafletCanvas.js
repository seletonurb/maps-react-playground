import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer, TileLayer, useMap
} from 'react-leaflet';
import CONSTANTS from '../constants/constants';
import { removeMarker, zoomToIncludeMarkers } from '../utils/leafletAPIUtils';
import CustomMarkerLeaflet from './CustomMarkerLeaflet';
import 'leaflet/dist/leaflet.css';
const { DEFAULT_MAP_DESTINATION } = CONSTANTS;


/*****************************************************
 * The following snippet will make the default marker appear on the map.
 * Related to the following issue: Marker not appearing for simple example.
 * https://github.com/PaulLeCam/react-leaflet/issues/453
 *****************************************************/
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
/*****************************************************/

const defaultViewport = {
  latitude: DEFAULT_MAP_DESTINATION.CENTER[0],
  longitude: DEFAULT_MAP_DESTINATION.CENTER[1],
  zoom: DEFAULT_MAP_DESTINATION.ZOOM
};
const mapStyle = {
  width: '100%',
  height: '100%'
}

const tileLayer = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}

const MarkerLayer = ({ markersArray }) => {
  const map = useMap()
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // filter out removed markers
    markers.forEach((marker) => {
      if (markersArray.indexOf(marker.id) === -1) {
        removeMarker(marker.id, map);
      }
    });
    setMarkers(markersArray)

    zoomToIncludeMarkers(map, markersArray)
  }, [markersArray]);

  return markers.map((m, index) => (
    <CustomMarkerLeaflet key={index} marker={m} />
  ));
}

const LeaftletCanvas = ({
  positions, selectedMarkerId, searchPlace
}) => {
  const [markersArray, setMarkersArray] = useState([]);

  useEffect(() => {
    if (!positions) {
      return
    }
    setMarkersArray(positions);
  }, [positions]);

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
      <MapContainer
        whenReady={() => console.log('Leaflet map ready')}
        id="leaflet-map" style={mapStyle}
        center={[defaultViewport.latitude, defaultViewport.longitude]} zoom={defaultViewport.zoom}
        scrollWheelZoom={false}
      >
        <TileLayer {...tileLayer} />
        <MarkerLayer markersArray={markersArray} />
      </MapContainer>
    </>
  );
};

export default LeaftletCanvas;
