import React, { useState } from 'react';
import MapContainerGoogle from './MapContainerGoogle';
import MapContainerMapbox from './MapContainerMapbox';
import MapContainerLeaflet from './MapContainerLeaflet';
import SidenavLeftMenu from './SidenavLeftMenu';

const MapsViewContainer = ({
  mapsType
}) => {
  const [maps, setMaps] = useState(null);
  const [searchPlace, setSearchPlace] = useState(null);

  const onMapsLoaded = maps => {
    setMaps(maps);
  };

  const renderMap = (mapsType) => {
    switch (mapsType) {
      case 'google':

        return (
          <MapContainerGoogle
            searchPlace={searchPlace}
            onMapsLoaded={onMapsLoaded}
          ></MapContainerGoogle>
        )

      case 'leaftlet':

        return (
          <MapContainerLeaflet
            searchPlace={searchPlace}
            onMapsLoaded={onMapsLoaded}
          ></MapContainerLeaflet>
        )

      case 'mapbox':

        return (
          <MapContainerMapbox
            searchPlace={searchPlace}
            onMapsLoaded={onMapsLoaded}
          ></MapContainerMapbox>
        )

      default:
        return (
          <>Map not found {mapsType}</>
        );
    }
  }

  return (
    <div className="day-view">
      <div className="day-view-resume">
        <SidenavLeftMenu
          setSearchPlace={setSearchPlace}
          maps={maps}
        />
      </div>

      <div className="day-view-content">
        <div id="map_canvas-wrapper">
          {renderMap(mapsType)}
        </div>

      </div>
    </div>
  );
};

export default MapsViewContainer;
