export const useParseCoordsPlaceToLocation = (coords: string | string[], place_name: string) => {
	const [latitude, longitude] = String(coords).split(',');

	return {
		place_name,
		coordinates: {
			latitude: Number(latitude),
			longitude: Number(longitude),
		},
	};
};
