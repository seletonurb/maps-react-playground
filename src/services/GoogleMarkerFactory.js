import MAP_CONSTANTS from '../constants/mapConstants';
import MarkerShape from './MarkerShape';
import MarkerStyle from './MarkerStyle';
const { MARKER_TYPES } = MAP_CONSTANTS
const markerShape = new MarkerShape().getPinShape()

/**
 * GoogleMarkerIcon Constructor
 */
function GoogleMarkerIcon(markerType) {
  const markerStyle = new MarkerStyle(markerType);
  const { fillOpacity, scale, strokeWidth, fill, stroke } = markerStyle;
  this.path = markerShape;
  this.fillOpacity = fillOpacity;
  this.scale = scale;
  this.strokeWeight = strokeWidth;
  this.fillColor = fill;
  this.strokeColor = stroke;
  // shiftLabelUp property is responsible for shifting a marker label from the origin to any wanted direction
  this.shiftLabel = true;
}

/**
 * Google Marker Factory Service
 */
const GoogleMarkerFactory = {};

/* 
  * Factory initialization function
  * 
  */
GoogleMarkerFactory.init = function () { };

const getIcon = (markerIcon = {}, markerType) => {
  const gMarkerIcon = new GoogleMarkerIcon(markerType);
  return { ...markerIcon, ...gMarkerIcon };


};

/* 
  * Returns an icon object according to the type input parameter.
  * 
  * @param {Object} markerIcon - Google Maps marker icon object
  * @param {String} markerType - (Optional) the marker type
  * 
  * @returns {Object} icon - a Google marker icon object
  */
GoogleMarkerFactory.getMarkerIcon = (markerIcon, markerType) => {
  const icon = getIcon(markerIcon, markerType);
  return icon;
};

const getShiftedLabelPoint = (maps) => {
  return new maps.Point(11, 10)
}

/* 
  * Build a Google Marker based on input parameters and add to a Google map.
  * 
  * @param {Object} maps - Google Maps object
  * @param {Object} map - Google Map object
  * @param {Number} latitude - the marker latitude
  * @param {Number} longitude - the marker longitude
  * @param {String} textLabel - the marker label
  * @param {String} id - the marker id
  * @param {String} markerType - (Optional) the marker type
  * 
  * @returns {Object} marker - a Google marker object
  */
GoogleMarkerFactory.buildMapMarker = function (maps, map, latitude, longitude, textLabel, id, markerType) {
  let marker;
  let loc;
  const mType = !markerType ? MARKER_TYPES.NORMAL : markerType;
  const markerIcon = getIcon(null, mType);

  if (markerIcon.shiftLabel) {
    markerIcon.labelOrigin = getShiftedLabelPoint(maps);
  }
  marker = new maps.Marker({
    title: `Marker: ${latitude}, ${longitude}`,
    icon: markerIcon
  });
  loc = new maps.LatLng(latitude, longitude);
  marker.setPosition(loc);
  marker.setLabel({
    color: 'white',
    fontSize: '10px',
    fontWeight: '400',
    text: (textLabel || '').toString()
  });
  marker.id = id;
  marker.setMap(map);

  return marker;
};

export default GoogleMarkerFactory;
