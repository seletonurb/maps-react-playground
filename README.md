# maps-react-playground #

A React/Redux application that integrates to the main map providers.
This is an example on how we can display map elements for different map provider from agnostic event objects that contains the corrsponding map coordinates.

Overview:
- A SPA with one screen containing a fixed left side navigation panel and a map
- Use of packages that provides bindings between React and the main map libraries: Google Maps, Mapbox anf Leaflet
- Ability to see a itinerary in a map with markers

Future work:
- Ability to do operations with geofences
- Cost breakdown of each request made to different APIs

## Setup

For all map libraries, an access token is needed to render components. The instructions to generate such tokens cna be found below.

### Google Maps
1. Create project on [GCP](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
2. Enable APIs: Directions API, Places API and 
3. Enable Billing on the project


### MapBox

_Note: Mapbox provides an API key used as an example in this project, so you don't need to generate an API key for small tests or to run this project._

To use any of Mapbox's tools, APIs, or SDKs, you'll need a Mapbox JWT [access token](https://docs.mapbox.com/help/glossary/access-token/).

Follow these steps to do so:
1. Create a Mapbox account.
2. Once you signed in, to create the authorization token, visit the [Tokens page](https://account.mapbox.com/access-tokens/)
3. Finally, click on the Create a token button.

More info on: [Mapbox access token](https://docs.mapbox.com/help/getting-started/access-tokens/)

### Leaftlet

Leaflet is a free and does not require additional settings. It is based on the OpenStreetMaps technology.

## Environment variables

Tokens can be configured as environment variables:

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
