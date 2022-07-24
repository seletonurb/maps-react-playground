import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ItineraryView from './ItineraryView';
import { useLocation } from 'react-router';
import { Tabs, Tab } from 'react-bootstrap';
import { updateHash } from '../utils/common';
import { setItineraryEvents, setGeofences, setCurrentTab } from '../actions/common';
import CONSTANTS from '../constants/constants';
import GeofencesView from './GeofencesView';
import CostsView from './CostsView';

const SidenavLeftMenu = ({
  setItineraryEvents,
  setGeofences,
  setCurrentTab,
  itineraryEvents,
  geofences,
  setSearchPlace,
  maps
}) => {
  const location = useLocation();

  // Wrap with useCallback to avoid change on every render. It returns a memoized version of the callback that only changes if one of the provided dependencies change.
  const getTabNameFromHash = useCallback(() => {
    const tabNameHash = location.hash ? location.hash.slice(1) : null; // removes the '#' character
    let tabName = CONSTANTS.DEFAULT_TAB_NAME;

    if (tabNameHash && CONSTANTS.TAB_NAMES_ENUM.indexOf(tabNameHash) !== -1) {
      tabName = tabNameHash;
    }
    console.log('Page rerendered: ' + tabNameHash);
    return tabName;
  }, [location]);

  const [key, setKey] = useState('');

  useEffect(() => {
    const tabName = getTabNameFromHash();
    setKey(tabName);
  }, [getTabNameFromHash]);

  useEffect(() => {
    setCurrentTab(key);
  }, [key]);

  const onTabChange = k => {
    setKey(k);
    updateHash(k);
  };

  const tabData = [
    {
      heading: 'Itinerary',
      route: 'tab-itinerary',
      display: true
    },
    {
      heading: 'Geofences',
      route: 'tab-geofences',
      display: true
    },
    {
      heading: 'Costs',
      route: 'tab-costs',
      display: true
    }
  ];

  const getTabContent = (tabKey) => {
    switch (tabKey) {
      case 'tab-itinerary':
        return <ItineraryView setSearchPlace={setSearchPlace} maps={maps} />;
      case 'tab-geofences':
        return <GeofencesView />;
      case 'tab-costs':
        return <CostsView />;
      default:
        return null;
    }
  };

  return (
    <div className="container padding-10">
      <div className="width-100 padding-10">
        <Tabs id="dashboard-tab" activeKey={key} onSelect={onTabChange}>
          {tabData.map((tab, index) => {
            if (!tab.display) {
              return null;
            }

            return (
              <Tab key={index} eventKey={tab.route} title={tab.heading}>
                {getTabContent(key)}
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </div>

  );
};

const mapStateToProps = state => ({
  inProgress: state.itinerary.inProgress,
  itineraryEvents: state.itinerary.itineraryEvents,
  geofences: state.geofence.geofences
});

const mapDispatchToProps = dispatch => ({
  setItineraryEvents: (queryEvents) => dispatch(setItineraryEvents(queryEvents)),
  setGeofences: (geofences) => dispatch(setGeofences(geofences)),
  setCurrentTab: (currentTab) => dispatch(setCurrentTab(currentTab))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidenavLeftMenu);
