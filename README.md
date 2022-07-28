# discovery-maps
A proof of concept for clients connecting to different maps tools and APIs.

Overview:
- A SPA with one screen containing a fixed left side nav and a map
- Ability to see a itinerary in the past hour
- [Not available] Ability to set geofences and check if an element is in/out of this geofence
- [Not available] Cost breakdown of each request made to different APIs

## Setup

### Google Maps
1. Create project on GCP
2. Enable APIs: Directions API, Places API and 
3. Enable Billing on the project

Link for project with API key: (GCP Project)[https://console.cloud.google.com/home/dashboard?project=maps-test-309315]

### Leaftlet

### MapBox

## Environment variables

`GOOGLE_MAPS_API_KEY`: Google Maps API key for Places, Directions and Map requests
`MAPBOX_API_KEY`: Mapbox API key


## Getting started

To get the app running locally:

- `yarn` to install all req'd dependencies
- `yarn start` to start the local server (this project uses create-react-app) or `yarn build` to build this project

## References
- [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/overview)
- [Google Map React](https://github.com/google-map-react/google-map-react#readme)
- [Mapbox Docs](https://docs.mapbox.com/mapbox-gl-js)
- [React Mapbox GL](https://github.com/visgl/react-map-gl/tree/master/examples)
- [LeafletJS Docs](https://leafletjs.com/reference.html)
- [React Leaflet](https://react-leaflet.js.org/docs/start-installation)
