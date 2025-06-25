<script lang="ts" setup>
import type { Geolocation } from '~/types';

const { location } = defineProps<{
	location: Geolocation;
}>();
</script>

<template>
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
			<v-container :class="{ 'mt-16': !$slots.forecast }">
				<h2 class="text-subtitle-2">
					<slot name="heading" />
				</h2>
				<div
					v-if="$slots.forecast"
					class="ga-4 py-4 hero__forecast rounded-lg"
				>
					<section>
						<div
							:class="{ 'text-shadow': $slots.image || $slots.media }"
						>
							<slot
								:place="location.place_name"
								name="subtitle"
							/>
						</div>
					</section>
					<slot
						:coordinates="location.coordinates"
						name="forecast"
					/>
				</div>
				<div
					v-else
					class="pt-4"
				>
					<slot name="subtitle" />
					<slot />
				</div>
			</v-container>
		</div>
	</div>
</template>

<style lang="css" scoped>
span.scrim::after {
    content: '';
    background-color: rgb(var(--v-theme-background));
    mask: linear-gradient(to bottom, #000 0 10%, #000 10%, transparent 100%);
    opacity: 0.5;
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
  }

  .hero {
    display: block;
    position: relative;
    overflow: hidden;
  }

  .hero__forecast {
    background-color: hsl(from rgb(var(--v-theme-background)) h s l / 0.5);
    backdrop-filter: blur(5px);
  }

  .hero__forecast > * {
    flex: 50%;
  }

  .hero__container > div {
    grid-row-start: 2;
    position: relative;
  }

  @media (min-width: 1024px) {
    .hero__forecast {
      display: flex;
    }
  }

  .hero__forecast {
    position: relative;

    & > div {
      height: max-content;
      margin: auto;
    }

    & * {
      width: auto;
    }
  }

 .bg-image {
    width: 100%;
    height: 100%;
  }

  .bg-video {
    display: block;
    overflow-y: hidden;
    position: static;
    height: 64px;
  }

  @supports (height: stretch) or (height: -moz-available){
    .hero__container, .bg-video {
      height: -moz-available;
      height: stretch;
    }
  }

  .hero__container {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: auto 1fr;
  }
</style>
