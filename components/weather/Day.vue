<script lang="ts" setup>
const { idx, date } = defineProps<{
	idx: number;
	date: string;
}>();
import { attachObservers } from '~/utils'
const observer = useTemplateRef('observer')
const observerEntry: Ref<IntersectionObserverEntry | null> = ref(null)
const isIntersecting = ref(false)

const id = {
	article: `${date}`,
	high: `${date}-high`,
	low: `${date}-low`
}

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
	<div class="day__card card">
		<article :id="id.article" ref="observer" :tabindex="idx + 1">
			<div class="day__bg"></div>
			<div class="day__header">
				<h3>
					<slot
						name="weekday"
					/>
					<span v-if="$slots.date">
						<slot
							name="date"
						/>
					</span>
				</h3>
			</div>
			<span v-if="$slots.precipitation" class="day__precipitation">
				<slot name="precipitation" />
			</span>
			<slot name="weather-code" />
			<div
				class="day__description"
				:class="{ full: !$slots.precipitation }"
			>
				<slot name="description" />
			</div>
			<div 
				class="day__temperatures"
			>
				<div :id="id.high" class="high">
					<p class="flex-xs-row">
						<small aria-label="High" class="flex-xs-row">
							<span aria-hidden="true">
								H
							</span>
						</small> 
						<span class="temperature">
							<slot name="high-temperature" />
						</span>
					</p>
				</div>
				<div :id="id.low" class="low">
					<p class="flex-xs-row">
						<small aria-label="Low">
							<span aria-hidden="true">
								L
							</span>
						</small> 
						<span class="temperature">
							<slot name="low-temperature" />
						</span>
					</p>
				</div>
			</div>
		</article>
	</div>
</template>