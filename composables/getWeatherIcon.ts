export const weatherIconsList = [
	{
		word: [
			'Clear',
			'Fair',
			'Sunny',
		],
		emoji: '☀️',
		video: 'path2tech-weather-app/qs1kgcawsbpacbetpnqr',
	},
	{
		word: ['Partly Sunny', 'Mostly Sunny'],
		emoji: '🌤️',
		video: 'path2tech-weather-app/d5j25mpv6fnbzf56nlu8',
	},
	{
		word: 'Partly Cloudy',
		emoji: '⛅️',
		video: 'path2tech-weather-app/pgnbxclkhvlbvkecezff',
	},
	{
		word: ['Cloudy', 'Mostly Cloudy'],
		emoji: '🌥️',
		video: 'path2tech-weather-app/tfj4qamzycive0clkyjn',
	},
	{
		word: 'Overcast',
		emoji: '☁️',
		video: 'path2tech-weather-app/tfj4qamzycive0clkyjn',
	},
	{
		word: [
			'Snow',
			'Snow Showers',
			'Thunderstorm Snow',
			'Light Snow',
			'Heavy Snow',
		],
		emoji: '🌨️',
		video: 'path2tech-weather-app/j08wgjv9bapydhtkuf3c',
	},
	{
		word: ['Ice Pellets', 'Hail', 'Snow Pellets'],
		emoji: '❄️',
		video: '',
	},
	{
		word: 'Windy',
		emoji: '🌬️',
		video: '',
	},
	{
		word: 'Thunderstorm',
		emoji: '⛈️',
		video: 'path2tech-weather-app/wol9lxbltq6dots9rvb1',
	},
	{
		word: ['Rain', 'Rain Showers'],
		emoji: '🌧️',
		video: 'path2tech-weather-app/yzclvykmirfpxelruxfq',
	},
];

export const cardColor = (num: number) => {
	const colorMap = [
		{
			range: [0, 10],
			color: 'bg-(--color-link-water-500)',
			text: 'text-(--color-link-water-50)',
		},
		{
			range: [10, 20],
			color: 'bg-(--color-link-water-300)',
			text: 'text-(--color-link-water-950)',
		},
		{
			range: [20, 30],
			color: 'bg-(--color-link-water-200)',
			text: 'text-(--color-link-water-950)',
		},
		{
			range: [30, 40],
			color: 'bg-(--color-link-water-100)',
			text: 'text-(--color-link-water-950)',
		},
		{
			range: [40, 50],
			color: 'bg-(--color-link-water-50)',
			text: 'text-(--color-link-water-950)',
		},
		{
			range: [50, 60],
			color: 'bg-(--color-light-apricot-50)',
			text: 'text-(--color-light-apricot-950)',
		},
		{
			range: [60, 70],
			color: 'bg-(--color-light-apricot-100)',
			text: 'text-(--color-light-apricot-950)',
		},
		{
			range: [70, 80],
			color: 'bg-(--color-light-apricot-200)',
			text: 'text-(--color-light-apricot-950)',
		},
		{
			range: [80, 90],
			color: 'bg-(--color-light-apricot-300)',
			text: 'text-(--color-light-apricot-950)',
		},
		{
			range: [90, 100],
			color: 'bg-(--color-light-apricot-500)',
			text: 'text-(--color-light-apricot-50)',
		},
	];

	for (const { range, color, text } of colorMap) {
		if (num >= range[0] && num < range[1]) {
			return [color, text];
		}
	}

	return 'bg-stone-50'; // Default color
};

export const useGetWeatherIcon = (isDaytime: boolean, string: string, temp: number) => {
	const icon: string[] = [];
	let cldURL: string = '';

	const searchForMatch = (term: string) => {
		const search: string = `${term}*`;
		const regex: RegExp = new RegExp(search, 'gm');
		return regex.test(string);
	};

	for (const { word, emoji, video } of weatherIconsList) {
		if (Array.isArray(word)) {
			for (const key in word) {
				if (searchForMatch(word[key])) {
					icon.push(emoji);
					cldURL = video;
				}
			}
			continue;
		}
		else {
			if (searchForMatch(word)) {
				icon.push(emoji);
				cldURL = video;
			}
		}
	}

	return { icon, cldURL, cardColor: cardColor(temp) };
};
