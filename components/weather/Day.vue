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
		<v-col>
			<article class="weatherDay" ref="observer">
				<h1>
					<slot
						name="weekday"
					/>
					<span class="weatherDate" v-if="$slots.date">
						<slot
							name="date"
						/>
					</span>
				</h1>
				<div>
					<v-chip prepend-icon="mdi-weather-rainy" v-if="$slots.precipitation">
						<slot name="precipitation" />
					</v-chip>
				</div>
				<div class="weatherCode">
					<slot name="weather-code" />
				</div>
				<div class="temperatures">
					<h2 class="high">
						<slot name="high-temperature" />
					</h2>
					<h3 class="low">
						<slot name="low-temperature" />
					</h3>
				</div>
				<div class="weatherDescription">
					<slot name="description" />
				</div>
			</article>
		</v-col>
</template>

<style lang="css">
.weatherDay {
	width: 100%;
    min-width: 148px;
	gap: 1em;
	display: flex;
		flex-flow: column nowrap;

	> div {
		width: initial;
	}
	> * {
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
	}

	h1 {
		flex: 0 0 min-content;
	}

	.weatherCode {
		flex: 2 1 100%;
	}

	.temperatures {
		flex: 1 1 50%;
	}

	.weatherDescription {
		flex: 1 1 50%;
	}

}

@media screen and (width >= 900px) {
	.weatherDay {
		gap: 0;
		margin: auto;
		height: 100%;

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
}

.high, .low {
	font-size: 2rem;
}
 .high {
	font-weight: 600;
 }

 .low {
	font-weight: 400;
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
}

.weatherDescription {
	margin: auto;
	align-items: end;
	p {
		text-align: center;
	}
}

.weatherDate::before {
	content: '| ';
	margin-left: 8px;
}

/* .fade-out {
	background: color-mix(in srgb, rgb(var(--v-theme-surface)) 50%, transparent)!important;
} */

@media screen and (width >= 900px) {
	.weatherCode {
		flex-direction: column;

		> img {
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
