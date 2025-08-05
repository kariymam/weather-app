export const useSetLocationCookie = (
	/** name of the cookie */
	name: string, 
	/** data for the cookie */
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
