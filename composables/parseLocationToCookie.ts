import type { Geolocation } from '~/types';

export const useParseLocationToCookie = (location: Geolocation) => {
	const [latitude, longitude] = location.coordinates;

	return `${location.place_name}/${latitude}/${longitude}`;
};
