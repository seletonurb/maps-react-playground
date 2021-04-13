import React from 'react';
import ItineraryEvent from '../components/ItineraryEvent';

const ListArea = ({ selectedEventId, elementsList, onSelectEvent, view, onDeleteEvent }) => {
  return (
    <div className="row-wrapper itinerary-canvas-drag-box itinerary-canvas-scrollbar">
      {elementsList.map((itineraryEvent, index) => {
        if (itineraryEvent.hidden && view) {
          return null;
        }

        return (
          <div key={index}>
            <ItineraryEvent
              index={index}
              itineraryEvent={itineraryEvent}
              mapIndex={itineraryEvent.mapIndex}
              isSelected={itineraryEvent._id === selectedEventId}
              onSelectEvent={onSelectEvent}
              onDeleteEvent={onDeleteEvent}
            ></ItineraryEvent>
          </div>
        );
      })}
    </div>
  );
};

const ListCanvas = ({
  title,
  inProgress,
  selectedEventId,
  onEventSelection,
  onEventDeletion,
  elementsList,
}) => {

  const onSelectEvent = itinerary => ev => {
    ev.preventDefault();
    onEventSelection(itinerary._id);
  };

  const onDeleteEvent = async eventId => {
    await onEventDeletion(eventId);
  };

  return (
    <div className="itinerary-canvas-column-wrapper fadein-container">
      <div className="itinerary-canvas-column itinerary-canvas-scrollbar">
        <div className="column-handle">
          {title}
        </div>
        {inProgress ? (
          <div className="load-overlay show">
            <div className="text">
              <i className="fa fa-spinner fa-spin spin-size"></i>
            </div>
          </div>
        ) : null}

        <ListArea
          selectedEventId={selectedEventId}
          elementsList={elementsList}
          onSelectEvent={onSelectEvent}
          onDeleteEvent={onDeleteEvent}
        ></ListArea>
      </div>
    </div>
  );
};

export default ListCanvas;
