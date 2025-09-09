<template>
	<v-card>
		<v-col>
			<div class="weatherDay">
				<h3>
					<slot
						name="weekday"
					/>
				</h3>
				<div class="weatherCode">
					<slot name="weather-code" />
					<div class="description">
						<slot name="description" />
					</div>
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
			</div>
		</v-col>
	</v-card>
	<p v-if="$slots.date" class="date">
		<slot
			name="date"
		/>
	</p>
</template>

<style lang="css">
.weatherDay {
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

.high, .date {
	font-weight: bold;
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

@media screen and (width >= 900px) {
	.weatherCode {
		flex-direction: column;

		> img {
			margin-top: 12px;
			width: 100%;
		}

		> img ~ .description {
			margin: auto;
			flex: 2 0 100px;
		}
	}
}


@media screen and (width >= 900px) {
	.description {
		max-width: 20ch;
	}
}

</style>
