import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import GoogleMapCanvas from '../components/GoogleMapCanvas';
import { initializeMapPositions } from '../utils/common';
import CONSTANTS from '../constants/constants';

const GoogleMapContainer = ({
  currentTab, currentItineraryEventId, currentGeofenceId, itineraryEvents, geofences, searchPlace, onMapsLoaded
}) => {
  useEffect(() => {
    setSelectedMarkerId(currentItineraryEventId || null);
  }, [currentItineraryEventId]);

  useEffect(() => {
    setSelectedMarkerId(currentGeofenceId || null);
  }, [currentGeofenceId]);

  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  const [mapPositions, setMapPositions] = useState(null);

  // forces map to rerender markers on tab change
  useEffect(() => {
    let currentElements = [];
    if (currentTab === CONSTANTS.TAB_NAMES_ENUM[0]) {
      currentElements = itineraryEvents;
    } else if (currentTab === CONSTANTS.TAB_NAMES_ENUM[1]) {
      currentElements = geofences;
    }

    const mapPositions = initializeMapPositions(currentElements);
    setMapPositions(mapPositions);
  }, [currentTab, itineraryEvents, geofences]);

  return (
    <GoogleMapCanvas
      id="map_canvas"
      positions={mapPositions}
      searchPlace={searchPlace}
      selectedMarkerId={selectedMarkerId}
      onMapsLoaded={onMapsLoaded}
    >
    </GoogleMapCanvas>
  );
};

const mapStateToProps = state => ({
  itineraryEvents: state.itinerary.itineraryEvents,
  currentTab: state.common.currentTab,
  geofences: state.geofence.geofences,
  currentItineraryEventId: state.itinerary.currentItineraryEventId,
  currentGeofenceId: state.geofence.currentGeofenceId
});

export default connect(mapStateToProps, null)(GoogleMapContainer);
