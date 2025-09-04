<template>
	<v-card>
		<v-col>
			<div class="weatherDay">
				<h3>
					<slot
						name="weekday"
					/>
				</h3>
				<v-divider></v-divider>
				<div class="weatherCode">
					<slot name="weather-code" />
					<div class="precipitation">
						<slot name="precipitation" />
					</div>
				</div>
				<div class="temperatures">
					<span class="high">
						<slot name="high-temperature" />
					</span>
					<span class="low">
						 <slot name="low-temperature" />
					</span>
				</div>
				<v-divider></v-divider>
				<span class="date">
					<slot
						name="date"
					/>
				</span>
			</div>
		</v-col>
	</v-card>
</template>

<style lang="css">
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

.weatherCode {
	position: relative;
	> img {
		margin: auto;
	}
	> img ~ .precipitation {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: max-content;
		margin: auto;
	}
}

.date {
	font-weight: 300;
}

</style>
