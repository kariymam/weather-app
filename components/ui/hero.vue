<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';

const { status } = defineProps<{
	status?: AsyncDataRequestStatus;
}>();

const isLoading = computed(() => status === 'success' ? false : true);
</script>

<template>
	<slot
		name="alerts"
	/>
	<div class="hero">
		<div
			v-if="$slots.image"
			class="bg-image"
		>
			<slot name="image" />
		</div>
		<div
			v-if="$slots.media && !$slots.image"
			class="bg-video"
		>
			<slot name="media" />
		</div>
		<span
			aria-hidden
			class="scrim"
		/>
		<div class="hero__container">
			<v-container>
				<h2 class="text-subtitle-2">
					<slot name="heading" />
				</h2>
				<div
					class="ga-4 py-4 hero__forecast rounded-lg"
				>
					<section>
						<h3>
							<slot name="subtitle" />
						</h3>

						<v-col v-if="$slots.forecast && $slots.default">
							<slot
								name="forecast"
								:is-loading="isLoading"
							/>
						</v-col>
						<slot />
					</section>
				</div>
			</v-container>
		</div>
	</div>
</template>
