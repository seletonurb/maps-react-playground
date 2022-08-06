import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addEventsToItinerary } from '../actions/common';
import LeaftletCanvas from '../components/LeafletCanvas';
import { initializeMapPositions } from '../utils/common';

const MapContainerLeaflet = ({ currentItineraryEventId, itineraryEvents, searchPlace }) => {
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
    <LeaftletCanvas
      positions={mapPositions}
      selectedMarkerId={selectedMarkerId}
      searchPlace={searchPlace} />
  );
};

const mapStateToProps = state => ({
  itineraryEvents: state.itinerary.itineraryEvents,
  currentItineraryEventId: state.itinerary.currentItineraryEventId
});

const mapDispatchToProps = dispatch => ({
  addEventsToItinerary: (queryEvents) => dispatch(addEventsToItinerary(queryEvents))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainerLeaflet);
