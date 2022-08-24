import { Marker } from 'react-map-gl';
import SVGPin from "./SVGPin";

const CustomMarkerMapbox = ({ index, latitude, longitude, isSelected }) => {
  return (
    <Marker
      key={`marker-${index}`}
      longitude={longitude}
      latitude={latitude}
    >
      <div>
        <SVGPin size={20} label={index + 1} isSelected={isSelected} />
      </div>
    </Marker>
  )
};

export default CustomMarkerMapbox;
