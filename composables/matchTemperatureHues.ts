const colorMap = [
	{
		name: '--orange',
		map: new Map([
			[[60, 65], '0'],
			[[65, 70], '100'],
			[[70, 75], '200'],
			[[75, 80], '300'],
			[[80, 90], '400'],
			[[90, 100], '500'],
		]),
	},
	{
		name: '--green',
		map: new Map([
			[[30, 35], '300'],
			[[35, 40], '200'],
			[[40, 50], '100'],
			[[50, 60], '0'],
		]),
	},
	{
		name: '--blue',
		map: new Map([
			[[0, 5], '300'],
			[[5, 10], '200'],
			[[10, 20], '100'],
			[[20, 30], '0'],
		]),
	},
];

export const useMatchTemperatureHues = (temperature: number) => {
	const cssVariable: { temp: number; cssVariable: string } = {
		temp: temperature,
		cssVariable: '',
	};

	colorMap.filter(({ name, map }) => {
		for (const [range, value] of map) {
			if (cssVariable.temp < 100 && cssVariable.temp >= range[0] && cssVariable.temp < range[1]) {
				cssVariable.cssVariable = `var(--bg-${name.replace('--', '')}-${value})`;
			}
			else if (cssVariable.temp >= 100) {
				cssVariable.cssVariable = `var(--bg-orange-500)`;
			}
		}
	});

	return cssVariable;
};
