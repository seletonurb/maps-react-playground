import MAP_CONSTANTS from '../constants/mapConstants';
const { defaultMarkerStyle, MARKER_TYPES } = MAP_CONSTANTS

/* 
  * Returns a marker style object according to the type input parameter.
  * 
  * @param {String} markerType - the marker type
  * 
  * @returns {Object} markerStyle - a marker style object with SVG properties
  */
const switchStyleByType = (markerType) => {
  switch (markerType) {
    case MARKER_TYPES.NORMAL:
      return { ...defaultMarkerStyle, fill: '#8B0000', stroke: 'red' };
    case MARKER_TYPES.SEARCH:
      return { ...defaultMarkerStyle, fill: '#0ECC15', stroke: 'green' };
    case MARKER_TYPES.SELECTED:
      return { ...defaultMarkerStyle, fill: '#008DD2', stroke: 'blue' };
    default:
      return defaultMarkerStyle;
  }
}

/**
 * SVG Marker Style Constructor
 */
function MarkerStyle(markerType) {
  const markerStyle = switchStyleByType(markerType);
  const { cursor, fill, fillOpacity, scale, stroke, strokeWidth, textColor, transform } = markerStyle;

  this.cursor = cursor;
  this.fill = fill;
  this.fillOpacity = fillOpacity;
  this.scale = scale;
  this.stroke = stroke;
  this.strokeWidth = strokeWidth;
  this.textColor = textColor;
  this.transform = transform;
}

export default MarkerStyle;
