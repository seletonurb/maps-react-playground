/******************************
 * Marker Shape Definition
 *******************************/
const SVG_BALLOON_SHAPE = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
const SVG_CIRCLE_SHAPE = 'M 0,0   m -15, 0  a 15,15 0 1,0 30,0  a 15,15 0 1,0 -30,0';
const SVG_DEFAULT_SHAPE = SVG_BALLOON_SHAPE;

/**
 * Constructor, with class name
 */
function MarkerShape() {
  // Public properties, assigned to the instance ('this')
}

/**
 * Public methods, assigned to prototype
 */
MarkerShape.prototype.getShape = function () {
  return SVG_DEFAULT_SHAPE;
};
MarkerShape.prototype.getBalloonShape = function () {
  return SVG_BALLOON_SHAPE;
};
MarkerShape.prototype.getCircleShape = function () {
  return SVG_CIRCLE_SHAPE;
};

/******************************
 * Marker Definition
 *******************************/

const defaultMarkerProps = {
  path: new MarkerShape().getBalloonShape(),
  fillOpacity: 0.8,
  scale: 0.8,
  strokeWeight: 2,
  fillColor: '#008DD2',
  strokeColor: 'blue'
};

/**
 * Constructor, with class name
 */
function Marker() {
  this.path = defaultMarkerProps.path;
  this.fillOpacity = defaultMarkerProps.fillOpacity;
  this.scale = defaultMarkerProps.scale;
  this.strokeWeight = defaultMarkerProps.strokeWeight;
  this.fillColor = defaultMarkerProps.fillColor;
  this.strokeColor = defaultMarkerProps.strokeColor;
  // shiftLabelUp property is responsible for shifting a marker label from the origin to any wanted direction
  this.shiftLabel = true;
}

/**
 * Public methods, assigned to prototype
 */
Marker.prototype.setSelectedState = function () {
  this.fillColor = '#FF0000';
  this.strokeColor = 'red';
};
Marker.prototype.setSearchState = function () {
  this.fillColor = '#0ECC15';
  this.strokeColor = 'green';
};
Marker.prototype.setShiftLabel = function (value) {
  this.shiftLabel = value;
};

/******************************
 * Marker Factory
 *******************************/

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

MarkerFactory.init = function (maps) {
  if (customPin.shiftLabel) {
    customPin.labelOrigin = new maps.Point(0, -25);
  }
  if (customSelectedPin.shiftLabel) {
    customSelectedPin.labelOrigin = new maps.Point(0, -25);
  }
  if (searchPin.shiftLabel) {
    searchPin.labelOrigin = new maps.Point(0, -25);
  }
};

MarkerFactory.buildMarkerMap = function (maps, map, latitude, longitude, textLabel, id, markerType) {
  let marker;
  let loc;

  markerType = markerType ? markerType : MarkerFactory.MARKER_TYPES.NORMAL;
  if (markerType.shiftLabel) {
    markerType.labelOrigin = new maps.Point(0, -25);
  }
  marker = new maps.Marker({
    title: `Marker: ${latitude}, ${longitude}`,
    icon: markerType
  });
  loc = new maps.LatLng(latitude, longitude);
  marker.setPosition(loc);
  marker.setLabel({
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
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
