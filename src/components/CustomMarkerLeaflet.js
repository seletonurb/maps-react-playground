import React from 'react';
import {
  Marker, Popup, Tooltip,
} from 'react-leaflet';
import { ICON_PIN } from '../constants/svgPaths';
import MarkerShape from '../services/MarkerShape';

const pinStyle = {
  path: new MarkerShape().getPinShape(),
  cursor: "pointer",
  fill: "#FF0000",
  fillOpacity: 0.8,
  scale: 0.8,
  stroke: "#8B0000",
  strokeWidth: "2",
  textColor: "white",
  transform: `translate(0px,0px)`
};

const svgIcon = (label) => L.divIcon({
  html: `<svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          version="1.1"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="${pinStyle.path}" fill="${pinStyle.fill}" stroke="${pinStyle.stroke}" stroke-width="${pinStyle.strokeWidth}"></path>
          <text x="8" y="15" fill="${pinStyle.textColor}">${label}</text>
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
