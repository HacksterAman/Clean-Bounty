import { Loader } from '@googlemaps/js-api-loader';
import { config } from './config';

const loader = new Loader({
  apiKey: config.googleMaps.apiKey,
  version: 'weekly',
  libraries: ['places', 'geometry']
});

export const initGoogleMaps = async () => {
  try {
    const google = await loader.load();
    return google;
  } catch (error) {
    console.error('Error loading Google Maps:', error);
    throw error;
  }
};

export const createMap = (
  element: HTMLElement,
  center: { lat: number; lng: number },
  zoom: number = 13
) => {
  return new google.maps.Map(element, {
    center,
    zoom,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  });
};

export const createMarker = (
  map: google.maps.Map,
  position: { lat: number; lng: number },
  title?: string
) => {
  return new google.maps.Marker({
    position,
    map,
    title,
    animation: google.maps.Animation.DROP
  });
}; 