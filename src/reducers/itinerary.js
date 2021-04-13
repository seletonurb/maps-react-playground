import {
  UPDATE_ITINERARY_EVENTS_REQUEST,
  UPDATE_ITINERARY_EVENTS_FAILURE,
  UPDATE_ITINERARY_EVENTS_SUCCESS,
  ITINERARY_RESET,
  UPDATE_ITINERARY_CURRENT_EVENT,
  SET_ITINERARY_EVENTS
} from '../constants/actionTypes';

const defaultState = {
  message: '',
  inProgress: false,
  error: null,
  currentItineraryEventId: null,
  itineraryEvents: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ITINERARY_EVENTS:
      const itineraryEvents = [...action.payload]
      return {
        ...state,
        itineraryEvents: itineraryEvents || defaultState.itineraryEvents
      };
    case ITINERARY_RESET:
      return {
        ...state,
        itineraryEvents: defaultState.itineraryEvents
      };
    case UPDATE_ITINERARY_EVENTS_REQUEST:
      return { ...state, inProgress: true };

    case UPDATE_ITINERARY_CURRENT_EVENT:
      return {
        ...state,
        currentItineraryEventId: action.currentItineraryEventId ? action.currentItineraryEventId : defaultState.currentItineraryEventId
      };
    case UPDATE_ITINERARY_EVENTS_SUCCESS:
      const updateEvents = action.payload;

      return {
        ...state,
        inProgress: false,
        error: null,
        message: action.message ? action.message : defaultState.message,
        itineraryEvents: [...updateEvents]
      };
    case UPDATE_ITINERARY_EVENTS_FAILURE:
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
