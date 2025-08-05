export const useSetCookie = (location: {
	place_name: string;
	coordinates: {
		latitude: string | number;
		longitude: string | number;
	}; }) => {
  return useSetLocationCookie(
		'location',
		`${location.place_name}/${location.coordinates.latitude}/${location.coordinates.longitude}`,
	).saveCookie();
}
