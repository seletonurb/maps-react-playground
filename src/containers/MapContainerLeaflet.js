import React from 'react';
import { connect } from 'react-redux';
import {
  MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet';
import { addEventsToItinerary } from '../actions/common';
import CONSTANTS from '../constants/constants';

const MapContainerLeaflet = ({ currentItineraryEventId, itineraryEvents }) => {
  return (
        <MapContainer center={[CONSTANTS.DEFAULT_MAP_DESTINATION.CENTER[0], CONSTANTS.DEFAULT_MAP_DESTINATION.CENTER[1]]} zoom={CONSTANTS.DEFAULT_MAP_DESTINATION.ZOOM} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
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
