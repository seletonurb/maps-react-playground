import { BALLOON_SHAPE, CIRCLE_SHAPE, ICON_PIN } from '../constants/svgPaths';
const SVG_DEFAULT_SHAPE = BALLOON_SHAPE;

/**
 * Marker Shape Constructor
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
  return BALLOON_SHAPE;
};
MarkerShape.prototype.getCircleShape = function () {
  return CIRCLE_SHAPE;
};
MarkerShape.prototype.getPinShape = function () {
  return ICON_PIN;
};

export default MarkerShape;
