import type { Geolocation } from '~/types';

export const useParseCookieToLocation = (cookie: string | null) => {
	if (cookie === null) {
		return;
	}

	const array = cookie.split('/');
	const [place_name, latitude, longitude] = array;

	return {
		place_name,
		coordinates: {
			latitude: Number(latitude), 
			longitude: Number(longitude)
		},
	} as Geolocation;
};
