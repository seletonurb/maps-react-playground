import React from 'react';
import {
  Marker, Popup,
} from 'react-leaflet';
import MarkerShape from '../services/MarkerShape';
import MAP_CONSTANTS from '../constants/mapConstants';
import MarkerStyle from '../services/MarkerStyle';

const markerShape = new MarkerShape().getPinShape()
const { MARKER_TYPES } = MAP_CONSTANTS

const svgIcon = (label, markerStyle) => L.divIcon({
  html: `<svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          version="1.1"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="${markerShape}" fill="${markerStyle.fill}" stroke="${markerStyle.stroke}" stroke-width="${markerStyle.strokeWidth}"></path>
          <text x="8" y="15" fill="${markerStyle.textColor}">${label}</text>
        </svg>`,
  className: "",
  iconSize: [40, 40],
  iconAnchor: [12, 40],
});

const CustomMarkerLeaflet = ({ marker }) => {
  console.log(marker)
  const { latitude, longitude, mapIndex, isSelected } = marker
  const markerStyle = isSelected ? new MarkerStyle(MARKER_TYPES.SELECTED) : new MarkerStyle(MARKER_TYPES.NORMAL)
  return (
    <Marker position={[latitude, longitude]} icon={svgIcon(`${mapIndex}`, markerStyle)}>
      <Popup direction='top' >Index: {mapIndex}</Popup>
    </Marker>
  );
}

export default CustomMarkerLeaflet;
