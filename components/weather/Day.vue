<template>
	<v-card>
		<v-col>
			<div :class="$style.weatherDay">
				<h3>
					<slot
						name="weekday"
					/>
				</h3>
				<v-divider></v-divider>
				<div :class="$style.weatherCode">
					<slot name="weather-code" />
					<div :class="$style.precipitation">
						<slot name="precipitation" />
					</div>
				</div>
				<div :class="$style.temperatures">
					<span :class="$style.high">
						<slot name="high-temperature" />
					</span>
					<span :class="$style.low">
						 <slot name="low-temperature" />
					</span>
				</div>
				<v-divider></v-divider>
				<span :class="$style.date">
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
		font-weight: 300;
		letter-spacing: 3.7px;
	}
	> div {
		width: 100%;
	}
	> * {
		display: flex;
		align-items: center;
	}
}

.temperatures {
	flex-flow: column nowrap;
	padding: 1rem 0;
	line-height: 1.1;
}

.high {
	font-size: 2rem;
}

.low {
	font-size: 1.5rem;
	font-weight: 300;
}

.precipitation {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	width: max-content;
    margin: auto;
	font-weight: 500;
}

.weatherCode {
	position: relative;
	> img {
		padding: 32px;
		margin: auto;
	}
}

.date {
	font-weight: 300;
}


</style>
