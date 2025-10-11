<script lang="ts" setup>
import { attachObservers } from '~/utils'

const observer = useTemplateRef('observer')
const observerEntry: Ref<IntersectionObserverEntry | null> = ref(null)
const isIntersecting = ref(false)

onMounted(() => {
	if (observer.value) {
		attachObservers(useGetElement([observer.value]), [observerEntry])
		watch(observerEntry, (val) => {
			if (val) {
				isIntersecting.value = val.isIntersecting
			}
		})
	}
})

</script>

<template>
	<v-card :class="[isIntersecting ? 'fade-in' : 'fade-out']">
		<v-col>
			<div class="weatherDay" ref="observer">
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
	width: 100%;
    min-width: 148px;
	gap: 1em;

	> div {
		width: initial;
	}
	> * {
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
	}

	h3 {
		flex: auto;
	}

	h3, .weatherDescription {
		justify-content: start;
		width: 100%;
	}

	.weatherCode {
		flex: 1;
	}

	.temperatures {
		flex: 1 0 25%;
	}

}

@media screen and (width >= 900px) {
	.weatherDay {
		display: flex;
		flex-flow: column nowrap;
		gap: 0;
		width: 172px;
		/* text-align: center; */

		> hr {
			margin-top: -12px;
		}
	}

	.v-col:has(.weatherDay) {
		min-height: 300px;
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

.high {
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
		margin: 0 0 auto 0;
	}

}

.precipitation {
	height: min-content!important;
}

img ~ .weatherDescription {
	margin: auto;
	flex: 2 0 100px;
}

.weatherDescription {
	font-size: var(--description-size);
	margin: auto;
	height: 100%;
	align-items: end;
}

.weatherDate::before {
	content: '| ';
	margin-left: 8px;
}

.fade-out {
	background: color-mix(in srgb, rgb(var(--v-theme-surface)) 50%, transparent)!important;
}

@media screen and (width >= 900px) {
	.weatherCode {
		flex-direction: column;

		> img {
			margin-top: 1em;
			aspect-ratio: 1 / 1 ;
			object-fit: cover;
			object-position: center;
		}
	}
}


@media screen and (width >= 900px) {
	.description {
		max-width: 20ch;
	}
}

</style>
