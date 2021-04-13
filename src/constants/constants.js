const CONSTANTS = {
  DEFAULT_MAP_DESTINATION: {
    NAME: 'United Kingdom',
    CENTER: [51.505, -0.09],
    ZOOM: 12
  },
  TAB_NAMES_ENUM: ['tab-itinerary', 'tab-geofences'],
  DEFAULT_TAB_NAME: 'tab-itinerary'
};

const MINUTE = 60 * 1000; // 60s = 1 minute
const HOUR = 60 * MINUTE; // 60 * 1 minute = 1 hour
const DAY = 24 * HOUR; // 24 * 1 hour = 1 day

CONSTANTS.TIME = {
  MINUTE,
  HOUR,
  DAY,
};

export default CONSTANTS;
