import MarkerShape from './MarkerShape';

/** ****************************
 * Marker Definition
 ****************************** */

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
 * Constructor, with class name
 */
function Marker() {
  const { path, fillOpacity, scale, strokeWeight, fill, strokeColor } = defaultMarkerProps;
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
 * Public methods, assigned to prototype
 */
Marker.prototype.setSelectedState = function () {
  this.fillColor = '#008DD2';
  this.strokeColor = 'blue';
};
Marker.prototype.setSearchState = function () {
  this.fillColor = '#0ECC15';
  this.strokeColor = 'green';
};
Marker.prototype.setShiftLabel = function (value) {
  this.shiftLabel = value;
};

/** ****************************
 * Marker Factory
 ****************************** */

const MarkerFactory = {};

const customPin = new Marker();
const customSelectedPin = new Marker();
customSelectedPin.setSelectedState();

const searchPin = new Marker();
searchPin.setSearchState();

MarkerFactory.MARKER_TYPES = {
  NORMAL: customPin,
  SEARCH: searchPin,
  SELECTED: customSelectedPin
};

const getShiftedLabelPoint = function (maps) {
  return new maps.Point(11, 10)
}


MarkerFactory.init = function (maps) {
  if (customPin.shiftLabel) {
    customPin.labelOrigin = getShiftedLabelPoint(maps);
  }
  if (customSelectedPin.shiftLabel) {
    customSelectedPin.labelOrigin = getShiftedLabelPoint(maps);
  }
  if (searchPin.shiftLabel) {
    searchPin.labelOrigin = getShiftedLabelPoint(maps);
  }
};

MarkerFactory.buildMarkerMap = function (maps, map, latitude, longitude, textLabel, id, markerType) {
  let marker;
  let loc;

  markerType = markerType || MarkerFactory.MARKER_TYPES.NORMAL;
  if (markerType.shiftLabel) {
    markerType.labelOrigin = getShiftedLabelPoint(maps);
  }
  marker = new maps.Marker({
    title: `Marker: ${latitude}, ${longitude}`,
    icon: markerType
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

MarkerFactory.clearMarkers = function (markers) {
  (markers || []).forEach(function (marker) {
    marker.setMap(null);
  });
  markers.length = 0;
};

MarkerFactory.removeMarker = function (markers, markerIdToRemove) {
  let markerIndex;
  (markers || []).forEach(function (marker, index) {
    if (markerIdToRemove === marker.id) {
      marker.setMap(null);
      markerIndex = index;
    }
  });

  if (markerIndex !== undefined) {
    markers.splice(markerIndex, 1);
  }
};

export default MarkerFactory;
