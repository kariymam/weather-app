<script lang="ts" setup>
import { WeatherBy7Day } from '#components';
import type { Geolocation } from '~/types';

definePageMeta({
	validate: async (route) => {
		return typeof route.params.coordinates === 'string' && /-?\d{2,}.\d+,-?\d{2,}.\d+/.test(route.params.coordinates);
	},
});

const { location } = defineProps<{
	location: Geolocation;
}>();

const route = useRoute();

const coordinates = ref(route.params.coordinates);

onBeforeMount(async () => {
	const { data: { value: cookie } } = await useFetch('/api/cookie');

	if (cookie) {
		const parsedCookie = useParseCookieToLocation(cookie.location);
		locationStore().saveLocation(parsedCookie as Geolocation);
	}
});

const { data, status } = await useFetch(`/api/weather/${coordinates.value}`, {
	method: 'post',
	body: {
		data: location,
	},
},
);


</script>

<template>
	<div>
		<div class="dashboard">
			<div class="dashboard__1">
				1
			</div>
			<div class="dashboard__2">
				2
			</div>
			<div class="dashboard__3">
				3
			</div>
			<div class="dashboard__4">
				<WeatherBy7Day
					:daily="data?.daily"
					:is-loading="status"
				/>
			</div>
		</div>
		<!-- <weather-by-hour
			:periods="data?.periods"
			:is-loading="status"
		/> -->
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
	background-color: grey;
	height: 100%;
}


@media screen and (width >= 900px) {

	.dashboard {
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: 1fr 1fr;
		padding: 16px 64px 48px 64px;
	}

	.dashboard__1 {
		grid-column: 1 / 7;
		grid-row: 1;
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
		display: flex;
		flex-flow: column nowrap;
		grid-column: 4 / 13;
		grid-row: 2;
	}
}


</style>