import React, { useEffect } from 'react';
import { initAutocompleteSearchPlacesBox } from '../utils/googleAPIUtils';
const SEARCH_PLACES_BOX_ID = 'pac-input';

const SearchPlacesInput = ({ maps, onPlaceFound, onPlaceCleared }) => {
  useEffect(() => {
    if (maps) {
      const inputElement = document.getElementById(SEARCH_PLACES_BOX_ID);
      initAutocompleteSearchPlacesBox(inputElement, maps, parsedPlace => {
        onPlaceFound(parsedPlace);
      });
    }
  }, [maps, onPlaceFound]);

  const onSearchResult = ev => {
    const searchQuery = ev.target.value;
    console.log(`New search query ${searchQuery}`);
    if (searchQuery.length === 0) {
      onPlaceCleared();
    }
  };

  if (!maps) {
    return null;
  }

  return (
    <input
      id={SEARCH_PLACES_BOX_ID}
      type="search"
      className="controls"
      name="q"
      placeholder={'Search Google Places'}
      onChange={onSearchResult}
    ></input>
  );
};

export default SearchPlacesInput;
