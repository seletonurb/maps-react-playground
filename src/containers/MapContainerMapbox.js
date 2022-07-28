import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addEventsToItinerary } from '../actions/common';

import { initializeMapPositions } from '../utils/common';
import MapboxCanvas from '../components/MapboxCanvas';

const MapContainerMapbox = ({ currentItineraryEventId, itineraryEvents, searchPlace }) => {

  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [mapPositions, setMapPositions] = useState(null);


  useEffect(() => {
    setSelectedMarkerId(currentItineraryEventId || null);
  }, [currentItineraryEventId]);

  useEffect(() => {
    const mapPositions = initializeMapPositions(itineraryEvents);
    setMapPositions(mapPositions);
  }, [itineraryEvents]);

  return (
    <MapboxCanvas
      id="map_canvas"
      positions={mapPositions}
      selectedMarkerId={selectedMarkerId}
      searchPlace={searchPlace}
    >
    </MapboxCanvas>
  );
};

const mapStateToProps = state => ({
  itineraryEvents: state.itinerary.itineraryEvents,
  currentItineraryEventId: state.itinerary.currentItineraryEventId
});

const mapDispatchToProps = dispatch => ({
  addEventsToItinerary: (queryEvents) => dispatch(addEventsToItinerary(queryEvents))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainerMapbox);
