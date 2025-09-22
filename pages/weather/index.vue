<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import { format } from 'date-fns';
import type { Geolocation, openmeteoDay, openmeteoPeriod, WeatherDescriptions } from '~/types';

onBeforeMount(async () => {
	const { data: { value: cookie } } = await useFetch('/api/cookie');

	if (cookie) {
		const parsedCookie = useParseCookieToLocation(cookie.location);
		locationStore().saveLocation(parsedCookie as Geolocation);
	}
});

export type WeatherAPIResponse = {
	coordinates: string
	weather: {
		data: {
			coordinates: string[];
			current: {
				time: string;
				precipitation: number;
				temperature2m: number;
				isDay: number;
				apparentTemperature: number;
			}
			periods: openmeteoPeriod[];
			daily: openmeteoDay[];
			descriptions: WeatherDescriptions[];
		},
		status: AsyncDataRequestStatus,
		// @ts-ignore -- Can't find type
		refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
	}
}

const { weather, location } = defineProps<{
	weather: WeatherAPIResponse["weather"];
	location: Geolocation;
}>();

const time = format(new Date(), 'p')

</script>

<template>
	<div>
		<div class="dashboard">
			<div class="dashboard__1">
				<v-col>
					<h2>Current forecast in {{ location.place_name }}...</h2>
					<WeatherCurrent :current="weather.data?.current" :descriptions="weather.data?.descriptions[0]" />
				</v-col>
			</div>
			<div class="dashboard__2">
				2
			</div>
			<div class="dashboard__3">
				3
			</div>
			<div class="dashboard__4">
				<h2>The week ahead</h2>
				<v-divider />
				<WeatherBy7Day
					:daily="weather.data?.daily"
					:descriptions="weather.data?.descriptions"
					:is-loading="weather.status"
				/>
			</div>
		</div>
	</div>
</template>
<style lang="css">
.dashboard {
	display: grid;
	grid-template-columns: 1fr;
	column-gap: 32px;
	row-gap: 48px;
	justify-content: stretch;
	align-content: stretch;
	align-items: center;
}

.dashboard > div {
	/* background-color:#eee; */
	border-style: solid;
    border-width: thin 0 0 0;
	border-color: inherit;
	display: flex;
	height: 100%;
    width: 100%;
}

.dashboard__1 h2 ~ .current {
	height: fit-content;
    margin: auto;
}

.v-col:has(.current) {
	display: flex;
    flex-flow: column;
}


@media screen and (width >= 900px) {

	.dashboard {
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: 1fr 1fr;
		padding: 16px 0 48px 0;
	}

	.dashboard__1 {
		grid-column: 1 / 7;
		grid-row: 1;
		flex-flow: column nowrap;
	}
	
	.dashboard__2 {
		grid-column: 7 / 13;
		grid-row: 1;
	}
	
	.dashboard__3 {
		grid-column: 1 / 4;
		grid-row: 2;
	}
	
	.dashboard__4 {

		--padding: 1rem 2rem;

		display: flex;
		flex-flow: column nowrap;
		grid-column: 4 / 13;
		grid-row: 2;

		h2 {
			padding: var(--padding);
		}
	}
}

</style>