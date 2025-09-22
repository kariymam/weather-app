<template>
	<v-card>
		<v-col>
			<div class="weatherDay">
				<h3>
					<slot
						name="weekday"
					/>
					<span class="weatherDate" v-if="$slots.date">
						<slot
							name="date"
						/>
					</span>
				</h3>
				<div class="weatherCode">
					<slot name="weather-code" />
					<div v-if="$slots.precipitation" class="precipitation">
						<slot name="precipitation" />
					</div>
				</div>
				<div class="temperatures">
					<p class="high">
						<slot name="high-temperature" />
					</p>
					<p class="low">
						<slot name="low-temperature" />
					</p>
				</div>
				<div class="weatherDescription">
					<slot name="description" />
				</div>
			</div>
		</v-col>
	</v-card>
</template>

<style lang="css">
.weatherDay {
	--description-size: var(--font-size-smallest);

	> div {
		width: initial;
	}
	> * {
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
	}
}

@media screen and (width >= 900px) {
	.weatherDay {
		display: flex;
		flex-flow: column nowrap;
		gap: 12px;
		width: 148px;
		text-align: center;

		> hr {
			margin-top: -12px;
		}
	}
}

.weatherDay hr {
	width: 100%;
}

.temperatures {
	flex-flow: column nowrap;
	line-height: 1.1;
	font-size: 2rem;
}

.high, .weatherDescription, .weatherDate {
	font-weight: bold;
}

.high::after, .low::after {
	content: '°';
	position: absolute;
}

.weatherCode {
	position: relative;

	> img ~ .description {
		display: grid;
		grid-template: 1fr / 1fr;
	}
	> img ~ .precipitation {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		width: max-content;
		margin: auto;
	}
}

img ~ .weatherDescription {
	margin: auto;
	flex: 2 0 100px;
}

.weatherDescription {
	font-size: var(--description-size);
	margin: auto;
	height: 100%;
}

.weatherDate::before {
	content: '| ';
	margin-left: 8px;
}

@media screen and (width >= 900px) {
	.weatherCode {
		flex-direction: column;

		> img {
			margin-top: 12px;
			width: 100%;
		}
	}
}


@media screen and (width >= 900px) {
	.description {
		max-width: 20ch;
	}
}

</style>
