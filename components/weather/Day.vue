<script lang="ts" setup>
import { format } from 'date-fns';
</script>

<template>
	<v-card>
		<v-col>
			<div class="weather-day grid">
				<h3 class="weather-day">
					<slot
						name="weekday"
						:format="(time: string) => format(time, 'ccc')"
					/>
				</h3>
				<div class="weather-day high-low-temperature">
					<div>
						<span>
							Weather Icon
						</span>
						<span class="temperature">
							<slot name="high-temperature" />°
						</span>
					</div>
					<v-divider vertical></v-divider>
					<div>
						<v-icon size="1.25rem" aria-label="Night temperature" role="img" aria-hidden="false">
					  		mdi-weather-night
						</v-icon>
					<span class="temperature">
						 <slot name="low-temperature" />°
					</span>
					</div>
				</div>
				<span class="weather-day date">
					<slot
						name="date"
						:format="(time: string) => format(time, 'MMM c')"
					/>
				</span>
			</div>
		</v-col>
	</v-card>
</template>

<style lang="css">
.weather-day.grid {
    display: grid;
    grid-template-areas:
    "header header header"
    ". temp ."
    "date . .";
}

h3.weather-day {
    grid-area: header;
}

span.weather-day.date {
    grid-area: date;
}

.weather-day.high-low-temperature {
	display: flex;
	gap: 2rem;
    grid-area: temp / 2;
	margin: auto;
	width: max-content;
	place-items: center;
}

.weather-day.high-low-temperature span,
.weather-day.high-low-temperature div {
	display: flex;
	place-items: center;
	text-align: center;
	dominant-baseline: middle;
	line-height: 2;
	gap: 0.5rem;
}

.high-low-temperature .temperature {
	font-size: 2rem;
}

</style>
