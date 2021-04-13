import React from 'react';
import { Dropdown } from 'react-bootstrap';
import mockedParisEvents from '../mocks/events_paris.json'
import mockedLondonEvents from '../mocks/events_london.json'

const ImportOptions = ({ onImportItineraryEventsWithOptions }) => {

  const importData = async (filename) => {
    switch (filename) {
      case 'events_paris':
        await onImportItineraryEventsWithOptions(mockedParisEvents)
        break;
      case 'events_london':
        await onImportItineraryEventsWithOptions(mockedLondonEvents)
        break;
      default:
        console.log(`File not found ${filename}`)
        break;
    }
  }

  return (
    <div className="">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-custom-components" drop="left">
          Import
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="2" onClick={(ev) => importData('events_paris')}>
            Events - Paris
            </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={(ev) => importData('events_london')}>
            Events - London
            </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ImportOptions;
