<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { Geolocation, WeatherGovPeriods } from '~/types';

const { location, data, status } = defineProps<{
	location: Geolocation;
	data: any;
	status: AsyncDataRequestStatus;
}>();

const today = computed(() => data.periodsByDay[0]);

const daytime = computed(() => data && data.periodsByDay.filter((obj: WeatherGovPeriods) => obj.isDaytime));

const alerts = useGetWeatherAlerts(data.alerts);
</script>

<template>
	<ui-hero
		:status="status"
	>
		<template #alerts>
			<weather-alerts :alerts="alerts" />
		</template>
		<template #heading>
			Right now in...
		</template>
		<template #subtitle>
			<h3>{{ location.place_name }}</h3>
		</template>
		<template #forecast>
			<div class="container">
				<v-skeleton-loader :loading="status === 'pending'">
					<ul
						id="periodsByDay"
					>
						<weather-period
							v-for="(period, idx) in daytime"
							:key="idx"
							:period="period"
							:idx="idx"
						>
							<template #high>
								{{ period.temperature }}
							</template>
							<template #low>
								{{ data.periodsByDay.find((obj: WeatherGovPeriods) => (obj.number === period.number + 1 && obj.isDaytime === false)).temperature }}
							</template>
						</weather-period>
					</ul>
				</v-skeleton-loader>
			</div>
		</template>
		<template #default>
			<h4>{{ today.name }}</h4>
			<p class="current-temperature">
				<span class="text-lg-h1">{{ Math.floor(data.current.temperature2m) }}</span>
			</p>
			<p>
				{{ today.shortForecast }}
			</p>
		</template>
	</ui-hero>
</template>

<style>
.container {
	display: flex;
	flex-flow: column nowrap;
  container-type: inline-size;
	overflow: auto hidden;
	overscroll-behavior-x: contain;
	scroll-snap-type: x mandatory;
  border: solid 1px #010c1346;
  border-radius: 4px;
  width: 100%;
}

ul#periodsByDay {
	display: grid;
	grid-template-columns: repeat(7, auto);
	& > li {
		display: flex;
		width: 200px;
		& > div {
			flex: 1 1 auto;
		}
	}
}
</style>
