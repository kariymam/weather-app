<template>
	<v-card>
		<v-col>
			<div :class="$style.weatherDay">
				<h3>
					<slot
						name="weekday"
					/>
				</h3>
				<div>
						<slot name="weather-code" />
						<slot name="precipitation" />
				</div>
				<div>
					<span class="temperature high">
						<slot name="high-temperature" />
					</span>
					<span class="temperature low">
						 <slot name="low-temperature" />
					</span>
				</div>
				<v-divider></v-divider>
				<span class="weather-day date">
					<slot
						name="date"
					/>
				</span>
			</div>
		</v-col>
	</v-card>
</template>

<style lang="css" module>
.weatherDay {
    display: flex;
	flex-flow: column nowrap;
	h3 {
		text-transform: uppercase;
	}
	& > div {
		width: 100%;
	}
}



.high-low-temperature .low,
.high-low-temperature .high {
	max-width: max-content;
	margin: auto;
	place-self: center;
}

.high-low-temperature .temperature {
	font-size: 2rem;
}

</style>
