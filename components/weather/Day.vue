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
	<div class="day__card">
		<article ref="observer">
			<span class="day__header">
				<slot
					name="weekday"
				/>
				<slot
					name="date"
				/>
			</span>
			<span class="day__precipitation">
				<slot name="precipitation" />
			</span>
			<div class="day__description">
				<slot name="weather-code" />
				<slot name="description" />
			</div>
			<div class="day__temperatures">
				<h3 class="high">
					<small>H</small> <slot name="high-temperature" />
				</h3>
				<h4 class="low">
					<small>L</small> <slot name="low-temperature" />
				</h4>
			</div>
		</article>
	</div>
</template>