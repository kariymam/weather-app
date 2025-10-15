import type { IUserLocation } from "~/validators";

export const useSetCookie = (
	location: IUserLocation
) => {

	const LocationCookie = (
		name: string,
		data: string
	) => {
		const cookie = useCookie(
			name,
			{
				default: () => '',
				watch: 'shallow',
			},
		);

		cookie.value = cookie.value || data;

		const saveCookie = () => {
			cookie.value = data;
		};

		const resetCookie = () => {
			cookie.value = '';
		};

		return {
			saveCookie,
			resetCookie,
		};
	};

	return LocationCookie(
		'location',
		`${location.latitude},${location.longitude}`,
	).saveCookie();
}
