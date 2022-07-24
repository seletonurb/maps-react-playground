import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addEventsToItinerary } from '../actions/common';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../sass/mapbox.scss'
import CONSTANTS from '../constants/constants'

// Example token from https://github.com/mapbox/mapbox-react-examples
mapboxgl.accessToken =
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const MapContainerMapbox = ({ currentItineraryEventId, itineraryEvents }) => {

    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(CONSTANTS.DEFAULT_MAP_DESTINATION.CENTER[1]);
    const [lat, setLat] = useState(CONSTANTS.DEFAULT_MAP_DESTINATION.CENTER[0]);
    const [zoom, setZoom] = useState(CONSTANTS.DEFAULT_MAP_DESTINATION.ZOOM);

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        // Clean up on unmount
        return () => map.remove();
    }, []);

    return (
        <div>
            <div className='sidebarStyle'>
                <div>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
            <div className='map-container' ref={mapContainerRef} />
        </div>
    );
};

const mapStateToProps = state => ({
    itineraryEvents: state.itinerary.itineraryEvents,
    currentItineraryEventId: state.itinerary.currentItineraryEventId
});

const mapDispatchToProps = dispatch => ({
    addEventsToItinerary: (queryEvents) => dispatch(addEventsToItinerary(queryEvents)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainerMapbox);
