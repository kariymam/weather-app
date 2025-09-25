// import { isSameDay, isThisHour } from 'date-fns';

// export function filterTodayPeriods(periods: unknown[], prop: string) {
// 	const filtered = () => periods?.filter(p => isSameDay(new Date(), p[prop]));
// 	const timeIdx = filtered().findIndex(p => isThisHour(p[prop]));

// 	return filtered().slice(timeIdx);
// }

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

export const weatherIconAndAssets = (string: string) => {
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

	return { icon, cldURL };
};

/**
 * Is the list of elements
 * @param target array of HTML Elements,
 * @param ref is an array of Vue refs
 */

export const attachObservers = ([...target], [...ref], options = { rootMargin: "16px", threshold: 0.75 }) =>[...target].forEach((elem) => {
		const intersectionObserver = new IntersectionObserver(entries => {
			entries.forEach((entry) => {
				console.log(entry)
				for (let i in target) {
					if (entry.target === target[i]){
						ref[i].value = entry as IntersectionObserverEntry
					}
				}
			})
		}, options)

		intersectionObserver.observe(elem)
	}
)