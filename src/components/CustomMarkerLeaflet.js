import React from 'react';
import {
  Marker, Popup,
} from 'react-leaflet';
import MarkerShape from '../services/MarkerShape';
import MAP_CONSTANTS from '../constants/mapConstants';

const markerShape = new MarkerShape().getPinShape()
const { defaultMarkerStyle } = MAP_CONSTANTS

const svgIcon = (label) => L.divIcon({
  html: `<svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          version="1.1"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="${markerShape}" fill="${defaultMarkerStyle.fill}" stroke="${defaultMarkerStyle.stroke}" stroke-width="${defaultMarkerStyle.strokeWidth}"></path>
          <text x="8" y="15" fill="${defaultMarkerStyle.textColor}">${label}</text>
        </svg>`,
  className: "",
  iconSize: [40, 40],
  iconAnchor: [12, 40],
});

const CustomMarkerLeaflet = ({ marker }) => {
  console.log(marker)
  return (
    <Marker position={[marker.latitude, marker.longitude]} icon={svgIcon(`${marker.mapIndex}`)}>
      <Popup direction='top' >Index: {marker.mapIndex}</Popup>
    </Marker>
  );
}

export default CustomMarkerLeaflet;
