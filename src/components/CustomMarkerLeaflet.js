import React from 'react';
import {
  Marker, Popup, Tooltip,
} from 'react-leaflet';
import { ICON_PIN } from '../constants/svgPaths';

const svgIcon = L.divIcon({
  html: `
<svg
  width="80"
  height="80"
  viewBox="0 0 100 100"
  version="1.1"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="${ICON_PIN}" fill="#d00"></path>
</svg>`,
  className: "",
  iconSize: [40, 40],
  iconAnchor: [12, 40],
});

const CustomMarkerLeaflet = ({ marker }) => {
  console.log(marker)
  return (
    <Marker position={[marker.latitude, marker.longitude]} icon={svgIcon}>
      <Popup>Index: {marker.mapIndex}</Popup>
      <Tooltip name="ttPane" direction='bottom' offset={[0, 0]} opacity={1} permanent>
        <span>{marker.mapIndex}</span>
      </Tooltip>
    </Marker>
  );
}

export default CustomMarkerLeaflet;
