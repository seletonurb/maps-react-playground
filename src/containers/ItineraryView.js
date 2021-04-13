import React from 'react';
import { connect } from 'react-redux';
import ListCanvas from './ListCanvas';
import { addEventsToItinerary, resetItineraryPayload, updateCurrentItineraryEventId, deleteEvent } from '../actions/common';
import SearchPlacesInput from '../components/SearchPlacesInput';
import ImportOptions from '../components/ImportOptions';

const ItineraryView = ({
    inProgress,
    itineraryEvents,
    currentItineraryEventId,
    updateCurrentItineraryEventId,
    addEventsToItinerary,
    resetItineraryPayload,
    deleteEvent,
    setSearchPlace,
    maps,
}) => {

    const convertPlaceToEvent = place => {
        const { id, name, latitude, longitude, address } = place;
        const newEvent = {
            _id: id, //locally generated id
            name,
            latitude,
            longitude,
            address,
        };

        return newEvent;
    };

    const onAddSearchPlace = async (place) => {
        if (place) {
            const itineraryEvent = convertPlaceToEvent(place)
            await addEventsToItinerary([itineraryEvent])
        }
    }

    const onPlaceFound = async place => {
        const { id, latitude, longitude, name, address } = place;
        updateSearchPlace(id, latitude, longitude, name, address);

        await onAddSearchPlace(place)
    };


    const onResetItineraryEvent = async () => {
        await resetItineraryPayload()

    };

    const onImportItineraryEventsWithOptions = async (mockedEvents) => {
        await addEventsToItinerary(mockedEvents)
    };


    const updateSearchPlace = (id, latitude, longitude, name, address) => {
        const searchPlace = {
            id,
            latitude,
            longitude, name, address
        };
        setSearchPlace(searchPlace);
    };

    const onPlaceCleared = () => {
        setSearchPlace(null);
    };

    return (
        <>
            <div className="row day-view-title">
                <div id="search-location-input" className="width-100 text-center">
                    {maps ? <SearchPlacesInput maps={maps} onPlaceFound={onPlaceFound} onPlaceCleared={onPlaceCleared}></SearchPlacesInput> : null}
                </div>

                <div className="col-12 days-links small text-center">
                    <div className="row padding-10">
                        <div className="col-6">
                            <ImportOptions onImportItineraryEventsWithOptions={onImportItineraryEventsWithOptions} />
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary btn-sm spaced" onClick={onResetItineraryEvent}>
                                Reset All
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {inProgress ? (
                    <div className="load-overlay show">
                        <div className="text">
                            <i className="fa fa-spinner fa-spin spin-size"></i>
                        </div>
                    </div>
                ) : null}
                <div className="day-canvas">
                    <ListCanvas
                        title={'Itinerary'}
                        elementsList={itineraryEvents}
                        selectedEventId={currentItineraryEventId}
                        onEventSelection={updateCurrentItineraryEventId}
                        onEventDeletion={deleteEvent}
                        className="itinerary-canvas-column-wrapper fadein-container"
                    />
                </div>
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    inProgress: state.itinerary.inProgress,
    itineraryEvents: state.itinerary.itineraryEvents,
    currentItineraryEventId: state.itinerary.currentItineraryEventId,
});

const mapDispatchToProps = dispatch => ({
    resetItineraryPayload: () => dispatch(resetItineraryPayload()),
    addEventsToItinerary: (queryEvents) => dispatch(addEventsToItinerary(queryEvents)),
    updateCurrentItineraryEventId: (eventId) => dispatch(updateCurrentItineraryEventId(eventId)),
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryView);
