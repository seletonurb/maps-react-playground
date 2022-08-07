import React from 'react';
import {
  Marker, Popup
} from 'react-leaflet';

const DefaultMarker = ({ marker }) => {

  return (
    <Marker position={[marker.latitude, marker.longitude]}>
      <Popup>Index: {marker.mapIndex}</Popup>
    </Marker>
  );
}

export default DefaultMarker;
