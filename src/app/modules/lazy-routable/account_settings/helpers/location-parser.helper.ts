
import PlaceResult = google.maps.places.PlaceResult;

export const parser = (result: PlaceResult) => (fn) => fn(result);

export const getFormattedAddress = (result: PlaceResult) =>  result.formatted_address;

export const getPostalCode = (result: PlaceResult) => result.address_components.find(el => el.types[0] === 'postal_code');

export const getState = (result: PlaceResult) => result.address_components.find(el => el.types[0] === 'administrative_area_level_1');

export const getCity = (result: PlaceResult) => result.address_components.find(el => el.types[0] === 'locality');

export const getStreet = (result: PlaceResult) => result.address_components.find(el => el.types[0] === 'route');

export const getStreetNumber = (result: PlaceResult) => result.address_components.find(el => el.types[0] === 'street_number');

export const getCountry = (result: PlaceResult) => result.address_components.find(el => el.types[0] === 'country');

