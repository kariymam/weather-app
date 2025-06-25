import type { Geolocation } from '~/types';

export const useSetLocationCookie = (name: string, data: string | Geolocation) => {
	const cookie = useCookie(
		name,
		{
			default: () => '',
			watch: 'shallow',
		},
	);

  data = useParseLocationToCookie(data as Geolocation);

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
