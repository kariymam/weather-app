<template>
	<v-card>
		<v-col>
			<div class="weather-day grid high-low-temperature">
				<h3 class="weather-day">
					<slot
						name="weekday"
					/>
				</h3>
				<div>
					<div class="high">
						<span>
							<slot name="weather-code" />
						</span>
						<span class="temperature">
							<slot name="high-temperature" />
						</span>
					</div>
				</div>
				<v-divider vertical></v-divider>
				<div>
					<div class="low">
						<v-icon size="1.25rem" aria-label="Night temperature" role="img" aria-hidden="false">
							  mdi-weather-night
						</v-icon>
					<span class="temperature">
						 <slot name="low-temperature" />
					</span>
					</div>
				</div>
				<slot name="precipitation" />
				<span class="weather-day date">
					<slot
						name="date"
					/>
				</span>
			</div>
		</v-col>
	</v-card>
</template>

<style lang="css">
.weather-day.grid {
    display: grid;
	grid-template-columns: 1fr max-content 1fr;
    grid-template-areas:
    "header header header"
    "high . low"
    ". . date";
}

h3.weather-day {
    grid-area: header;
}

span.weather-day.date {
    grid-area: date;
	margin-left: auto;
}

.high-low-temperature .high {
	grid-area: high;
}

.high-low-temperature .low {
	grid-area: low;
}

.high-low-temperature .low,
.high-low-temperature .high {
	max-width: max-content;
	margin: auto;
	place-self: center;
}

.high-low-temperature .low {
	margin-left: 1.5rem;
}

.high-low-temperature .high {
	margin-right: 1.5rem;
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
