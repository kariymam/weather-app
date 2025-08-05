import { isSameDay, isThisHour } from 'date-fns';
// import type { WeatherGovPeriods } from './types';

// export const getWeekdays = (periodsByDay: WeatherGovPeriods[]) => {
// 	const map = [];

// 	const arr = periodsByDay || [];

// 	const insertArrows = (arr: string[], arrow: string = '→') => {
// 		if (arr.length <= 1) return arr;
// 		return arr.flatMap((el, i) => i < arr.length - 1 ? [el, arrow] : [el]);
// 	};

//     function getAssets(day: WeatherGovPeriods) {
//         const assets = weatherIconAndAssets(day.isDaytime, day.shortForecast, day.temperature);
// 		assets.icon = insertArrows(assets.icon);
//         return assets
//     } 

// 	const seperateByPeriod = (i: number) => {
// 		const [daytime, night] = arr.slice(i, i + 2);
// 		return map.push({ name: daytime.name, daytime, night, assets: getAssets(daytime) } as { name: string, daytime: WeatherGovPeriods; night: WeatherGovPeriods });
// 	};

// 	if (arr[0].name === 'Tonight') {
// 		for (let i = 1; i < arr.length; i += 2) {
// 			seperateByPeriod(i);
// 		}
// 		map.unshift({ name: arr[0].name, daytime: null, night: arr[0], assets: getAssets(arr[0]) });
// 		map.pop();
// 	}
// 	else {
// 		for (let i = 0; i < arr.length; i += 2) {
// 			seperateByPeriod(i);
// 		}
// 	};

// 	return periodsByDay && map;
// };

export function filterTodayPeriods(periods: any[], prop: string) {
	const filtered = () => periods?.filter(p => isSameDay(new Date(), p[prop]));
	const timeIdx = filtered().findIndex(p => isThisHour(p[prop]));

	return filtered().slice(timeIdx);
}

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

export const weatherIconAndAssets = (isDaytime: boolean, string: string, temp: number) => {
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
