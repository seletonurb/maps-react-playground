import {
  SHOW_TOAST,
  HIDE_TOAST,
  UPDATE_ITINERARY_EVENTS_REQUEST,
  UPDATE_ITINERARY_EVENTS_FAILURE,
  UPDATE_ITINERARY_EVENTS_SUCCESS,
  ITINERARY_RESET,
  UPDATE_ITINERARY_CURRENT_EVENT,
  RESET_GEOFENCES,
  UPDATE_GEOFENCES_FAILURE,
  UPDATE_GEOFENCES_SUCCESS,
  UPDATE_GEOFENCES_REQUEST,
  UPDATE_GEOFENCE_CURRENT_ID,
  SET_ITINERARY_EVENTS,
  SET_GEOFENCES,
  SET_CURRENT_TAB
} from '../constants/actionTypes';

import { mockHttp } from '../mocks/http-mock'
import { addMapIndexToItineraryEvents } from '../utils/common';

export const setToastSuccessMessage = (message, consoleMsg) => {
  if (consoleMsg) {
    console.log(consoleMsg);
  }
  return { type: SHOW_TOAST, message, mtype: 'success' };
};
export const setToastErrorMessage = (message, consoleMsg) => {
  if (consoleMsg) {
    console.log(consoleMsg);
  }
  return { type: SHOW_TOAST, message, mtype: 'error' };
};
export const setToastWarningMessage = (message, consoleMsg) => {
  if (consoleMsg) {
    console.log(consoleMsg);
  }
  return { type: SHOW_TOAST, message, mtype: 'warning' };
};
export const hideToastMessage = () => {
  return { type: HIDE_TOAST };
};

export const updateItineraryEventsRequest = () => ({ type: UPDATE_ITINERARY_EVENTS_REQUEST });

export const resetItineraryPayload = () => ({
  type: ITINERARY_RESET
});

export const updateCurrentItineraryEventId = currentItineraryEventId => ({
  type: UPDATE_ITINERARY_CURRENT_EVENT,
  currentItineraryEventId
});

export const updateItineraryEventsSuccess = (message, payload) => ({
  type: UPDATE_ITINERARY_EVENTS_SUCCESS,
  message,
  payload
});

export const updateItineraryEventsFailure = errorMsg => ({ type: UPDATE_ITINERARY_EVENTS_FAILURE, error: { message: errorMsg } });

export const addEventsToItinerary = (queryEvents) => {
  // as defined in redux thunk
  return async (dispatch, getState) => {
    dispatch(updateItineraryEventsRequest());

    try {

      const addEventSuccessMessage = 'Added New Itinerary event!';
      const { itineraryEvents } = getState().itinerary;
      let updatedItineraryEvents = [...itineraryEvents, ...queryEvents];

      await mockHttp(true, 200) // mocked http request
      addMapIndexToItineraryEvents(updatedItineraryEvents); // mutates the events by adding a mapIndex property
      dispatch(updateItineraryEventsSuccess(addEventSuccessMessage, updatedItineraryEvents));
      dispatch(setToastSuccessMessage(addEventSuccessMessage));

      return true;
    } catch (error) {
      const errorMsg = `Error when adding new itinerary event: ${error.message}`;
      dispatch(updateItineraryEventsFailure(error));
      dispatch(setToastErrorMessage(errorMsg, `Error when adding new itinerary event: ${JSON.stringify(error)}`));
      return false;
    }
  };
};

export const deleteEvent = (eventId) => {
  // as defined in redux thunk
  return async (dispatch, getState) => {
    dispatch(updateItineraryEventsRequest());

    try {
      const deletionSuccessMessage = 'Itinerary Event deleted!';

      const { itineraryEvents } = getState().itinerary;
      const deleteIndex = itineraryEvents.findIndex(event => event._id === eventId)
      let removedEvent = itineraryEvents.splice(deleteIndex, 1);
      const modifiedItineraryEvents = [...itineraryEvents]

      await mockHttp(true, 200) // mocked http request
      addMapIndexToItineraryEvents(modifiedItineraryEvents); // mutates the events by adding a mapIndex property
      dispatch(updateItineraryEventsSuccess(deletionSuccessMessage, modifiedItineraryEvents));
      dispatch(setToastSuccessMessage(deletionSuccessMessage, `Itinerary Event successfully deleted: ${removedEvent._id}`));

      return true;
    } catch (error) {
      const errorMsg = `Error when deleting itinerary event: ${error.message}`;
      dispatch(updateItineraryEventsFailure(error));
      dispatch(setToastErrorMessage(errorMsg, `Error when deleting a Itinerary Event: ${JSON.stringify(error)}`));
      return false;
    }
  };
};

export const updateGeofenceRequest = () => ({ type: UPDATE_GEOFENCES_REQUEST });

export const resetGeofencesPayload = () => ({
  type: RESET_GEOFENCES
});

export const updateGeofencesSuccess = (message, payload) => ({
  type: UPDATE_GEOFENCES_SUCCESS,
  message,
  payload
});

export const updateGeofencesFailure = errorMsg => ({ type: UPDATE_GEOFENCES_FAILURE, error: { message: errorMsg } });

export const addGeofences = (queryGeofences) => {
  // as defined in redux thunk
  return async (dispatch, getState) => {
    dispatch(updateGeofenceRequest());

    try {

      const addEventSuccessMessage = 'Added New geofence!';
      const { geofences } = getState().geofence;
      let updatedGeofences = [...geofences, ...queryGeofences];

      await mockHttp(true, 200) // mocked http request
      addMapIndexToItineraryEvents(updatedGeofences); // mutates the events by adding a mapIndex property
      dispatch(updateGeofencesSuccess(addEventSuccessMessage, updatedGeofences));
      dispatch(setToastSuccessMessage(addEventSuccessMessage));

      return true;
    } catch (error) {
      const errorMsg = `Error when adding new geofence: ${error.message}`;
      dispatch(updateGeofencesFailure(error));
      dispatch(setToastErrorMessage(errorMsg, `Error when adding new geofence: ${JSON.stringify(error)}`));
      return false;
    }
  };
};


export const deleteGeofence = (eventId) => {
  // as defined in redux thunk
  return async (dispatch, getState) => {
    dispatch(updateGeofenceRequest());

    try {
      const deletionSuccessMessage = 'geofence deleted!';

      const { geofences } = getState().geofence;
      const deleteIndex = geofences.findIndex(event => event._id === eventId)
      let removedEvent = geofences.splice(deleteIndex, 1);
      const modifiedGeofences = [...geofences]

      await mockHttp(true, 200) // mocked http request
      addMapIndexToItineraryEvents(modifiedGeofences); // mutates the events by adding a mapIndex property
      dispatch(updateGeofencesSuccess(deletionSuccessMessage, modifiedGeofences));
      dispatch(setToastSuccessMessage(deletionSuccessMessage, `geofence successfully deleted: ${removedEvent._id}`));

      return true;
    } catch (error) {
      const errorMsg = `Error when deleting geofence: ${error.message}`;
      dispatch(updateGeofencesFailure(error));
      dispatch(setToastErrorMessage(errorMsg, `Error when deleting a geofence: ${JSON.stringify(error)}`));
      return false;
    }
  };
};

export const updateCurrentGeofenceId = currentGeofenceId => ({
  type: UPDATE_GEOFENCE_CURRENT_ID,
  currentGeofenceId
});

export const setItineraryEvents = payload => ({
  type: SET_ITINERARY_EVENTS,
  payload
});

export const setGeofences = payload => ({
  type: SET_GEOFENCES,
  payload
});

export const setCurrentTab = currentTab => ({
  type: SET_CURRENT_TAB,
  currentTab
});