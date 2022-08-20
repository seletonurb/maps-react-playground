import MarkerShape from './MarkerShape';

const defaultMarkerProps = {
  path: new MarkerShape().getPinShape(),
  cursor: "pointer",
  fill: '#FF0000',
  fillOpacity: 0.8,
  scale: 0.8,
  strokeColor: '#8B0000',
  strokeWeight: 2,
  textColor: 'white',
  transform: `translate(0px,0px)`,
};

/**
 * GoogleMarkerIcon Constructor
 */
function GoogleMarkerIcon(markerIcon = {}) {
  const { path: defaultPath, fillOpacity: defaultFillOpacity, scale: defaultScale, strokeWeight: defaultStrokeWeight, fill: defaultFill, strokeColor: defaultStrokeColor } = defaultMarkerProps;
  const { path = defaultPath, fillOpacity = defaultFillOpacity, scale = defaultScale, strokeWeight = defaultStrokeWeight, fill = defaultFill, strokeColor = defaultStrokeColor } = markerIcon;
  this.path = path;
  this.fillOpacity = fillOpacity;
  this.scale = scale;
  this.strokeWeight = strokeWeight;
  this.fillColor = fill;
  this.strokeColor = strokeColor;
  // shiftLabelUp property is responsible for shifting a marker label from the origin to any wanted direction
  this.shiftLabel = true;
}

/**
 * Google Marker Factory Service
 */
const GoogleMarkerFactory = {};

GoogleMarkerFactory.MARKER_TYPES = {
  NORMAL: 'NORMAL_MARKER',
  SEARCH: 'SEARCH_MARKER',
  SELECTED: 'SELECTED_MARKER'
};

GoogleMarkerIcon.prototype.getIcon = function (markerIcon, markerType) {
  if (!markerIcon) {
    markerIcon = new GoogleMarkerIcon();;
  }
  if (markerType === GoogleMarkerFactory.MARKER_TYPES.NORMAL) {
    return { ...markerIcon, fillColor: '#8B0000', strokeColor: 'red' };
  }
  if (markerType === GoogleMarkerFactory.MARKER_TYPES.SEARCH) {
    return { ...markerIcon, fillColor: '#0ECC15', strokeColor: 'green' };
  }
  if (markerType === GoogleMarkerFactory.MARKER_TYPES.SELECTED) {
    return { ...markerIcon, fillColor: '#008DD2', strokeColor: 'blue' };
  }
};

GoogleMarkerFactory.getMarkerIcon = (markerIcon, markerType) => {
  const mergedPin = new GoogleMarkerIcon(markerIcon);
  const marker = mergedPin.getIcon(markerIcon, markerType);
  return marker;
};

const getShiftedLabelPoint = function (maps) {
  return new maps.Point(11, 10)
}

GoogleMarkerFactory.init = function () { };

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
  */
GoogleMarkerFactory.buildMarkerMap = function (maps, map, latitude, longitude, textLabel, id, markerType) {
  let marker;
  let loc;
  const mType = !markerType ? GoogleMarkerFactory.MARKER_TYPES.NORMAL : markerType;
  const mIcon = new GoogleMarkerIcon();
  const markerIcon = mIcon.getIcon(mIcon, mType);

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
