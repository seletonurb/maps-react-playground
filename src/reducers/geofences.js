import {
  UPDATE_GEOFENCES_REQUEST,
  UPDATE_GEOFENCES_FAILURE,
  UPDATE_GEOFENCES_SUCCESS,
  RESET_GEOFENCES,
  UPDATE_GEOFENCE_CURRENT_ID,
  SET_GEOFENCES
} from '../constants/actionTypes';

const defaultState = {
  message: '',
  inProgress: false,
  error: null,
  currentGeofenceId: null,
  geofences: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_GEOFENCES:
      const geofences = [...action.payload]
      return {
        ...state,
        geofences: geofences || defaultState.geofences
      };
    case RESET_GEOFENCES:
      return {
        ...state,
        geofences: defaultState.geofences
      };
    case UPDATE_GEOFENCES_REQUEST:
      return { ...state, inProgress: true };

    case UPDATE_GEOFENCE_CURRENT_ID:
      return {
        ...state,
        currentGeofenceId: action.currentGeofenceId ? action.currentGeofenceId : defaultState.currentGeofenceId
      };
    case UPDATE_GEOFENCES_SUCCESS:
      const updateGeofences = action.payload;

      return {
        ...state,
        inProgress: false,
        error: null,
        message: action.message ? action.message : defaultState.message,
        geofences: [...updateGeofences]
      };
    case UPDATE_GEOFENCES_FAILURE:
      return {
        ...state,
        inProgress: false,
        message: defaultState.message,
        error: action.error ? action.error : null
      };
    default:
      return state;
  }
};
