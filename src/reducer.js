import { combineReducers } from 'redux';
import common from './reducers/common';
import itinerary from './reducers/itinerary';
import geofence from './reducers/geofences';
import { connectRouter } from 'connected-react-router';

export default history =>
  combineReducers({
    common,
    itinerary,
    geofence,
    router: connectRouter(history)
  });
