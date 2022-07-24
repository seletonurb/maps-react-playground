import React from 'react';
import { useParams } from 'react-router';
import MapsViewContainer from '../containers/MapsViewContainer';

const MapsViewPage = () => {
  const { mapsType } = useParams();

  return (
    <div id="day-view-container" className="container special padding-10">
      <MapsViewContainer mapsType={mapsType} />
    </div>
  );
};

export default MapsViewPage;
