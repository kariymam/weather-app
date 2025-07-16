<script lang="ts" setup>
import { format } from 'date-fns';
import type { WeatherGovPeriods } from '~/types';

const { period, idx } = defineProps<{
	period: WeatherGovPeriods;
	idx: number;
}>();

const {
	startTime,
	probabilityOfPrecipitation: { value: probabilityOfPrecipitation },
	windSpeed,
	shortForecast,
} = period;

const showTooltip = ref(false);

const shortForecastDesc = computed(() => period.shortForecast.replaceAll(/and/gi, '&'));

const { icon } = useGetWeatherIcon(period.isDaytime, period.shortForecast, period.temperature);

const insertArrows = (arr: string[], arrow: string = '→') => {
	if (arr.length <= 1) return arr;
	return arr.flatMap((el, i) => i < arr.length - 1 ? [el, arrow] : [el]);
};
</script>

<template>
	<li>
		<v-card>
			<v-card-text>
				<div class="weather-period">
					<div>
						<h4>
							<time>{{ idx === 0 ? "Today" : format(startTime, 'ccc') }}</time>
						</h4>
						<v-col
							v-if="shortForecast"
						>
							<v-tooltip
								v-if="shortForecast"
								v-model="showTooltip"
								:open-on-hover="false"
								open-on-click
								@click:outside="showTooltip = false"
							>
								<template #activator="{ props }">
									<button
										v-bind="props"
										:aria-label="shortForecastDesc"
										class="v-row justify-space-between"
									>
										<div
											v-for="(el, i) in insertArrows(icon)"
											:key="i"
										>
											<span>{{ el }}</span>
										</div>
									</button>
								</template>
								<span>{{ shortForecastDesc }}</span>
							</v-tooltip>
						</v-col>
					</div>
					<div
						:id="format(startTime, 'yyyy-MM-dd')"
						class="temperatures pa-0"
					>
						<p
							class="high"
						>
							<span class="text-sm-h4">
								<slot name="high" />
							</span>
						</p>
						<p class="low">
							<span class="text-sm-h4">
								<slot name="low" />
							</span>
						</p>
					</div>
					<div class="justify-end align-content-end">
						<v-col>
							<v-row class="align-center ga-1">
								<v-icon
									aria-label="Probability of precipitation"
									role="img"
									aria-hidden="false"
								>
									mdi-water
								</v-icon>
								<p>{{ probabilityOfPrecipitation }}%</p>
							</v-row>
							<v-row class="align-center ga-1">
								<v-icon
									aria-label="Wind speed"
									role="img"
									aria-hidden="false"
								>
									mdi-weather-windy
								</v-icon>
								<p>{{ windSpeed }}</p>
							</v-row>
						</v-col>
					</div>
				</div>
			</v-card-text>
		</v-card>
	</li>
</template>

<style lang="css">
.forecastDesc {
		text-transform: lowercase;
	}
.forecastDate {
	text-transform: lowercase;
}

.temperatures {
	width: fit-content;
	margin: auto;
}

.low::after {
	content: 'L';
}

.high::after {
	content: 'H';
}

.weather-period {
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	gap: 0.24em;
}
</style>
