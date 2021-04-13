import React from 'react';
import { getItineraryEventDateLabel } from '../utils/common';

const ItineraryEventSkeleton = ({ children, itineraryEvent, titleContent }) => {
  const itinearyEventDateLabel = getItineraryEventDateLabel(itineraryEvent, true);

  return (
    <>
      <div className="hour-column">
        <div className="itinerary-canvas-cell-title">
          <span className="badge badge-light">{itinearyEventDateLabel}</span>
        </div>
      </div>
      <div className="inner-event">
        <div className="itinerary-canvas-cell-title">
          <span className="list-card-title"><span className="title">{titleContent}</span></span>
        </div>
        {children}
      </div>
    </>
  );
};

const ItineraryEvent = ({ itineraryEvent, isEdition, isSelected, mapIndex, onSelectEvent, actionFn, onDeleteEvent }) => {
  const getEventClassName = (isSelected) => {
    let className = 'itinerary-canvas-cell itinerary-canvas-drag-box ';

    className += isSelected ? ' selected ' : '';
    return className;
  };

  const eventClassName = getEventClassName(isSelected, isEdition, itineraryEvent.eventType);


  const deleteItineraryEvent = async event => {
    const { _id: eventId } = event;

    await onDeleteEvent(eventId);
  };

  return (
    <div className={eventClassName} onClick={onSelectEvent(itineraryEvent)}>
      {(

        <ItineraryEventSkeleton itineraryEvent={itineraryEvent} titleContent={itineraryEvent.name} >
          <div className="distance-sub-header">
            <div className="map-index-container">
              {mapIndex ? <label className={`map-index ${isSelected ? 'selected' : ''}`}>{mapIndex}</label> : null}
            </div>
          </div>
          <div className="distance-sub-header-bottom" onClick={ev => deleteItineraryEvent(itineraryEvent)} >
            <i className="fa fa-trash" title={'Delete'} aria-hidden="true" style={{ color: 'blue' }}></i>
          </div>
        </ItineraryEventSkeleton>
      )}
    </div>
  );
};

export default ItineraryEvent;
