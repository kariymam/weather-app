<script lang="ts" setup>
const { alerts } = defineProps<{
	alerts?: { title: string; text: string }[] | null;
}>();
// const theme = useTheme();
// const current = ref(theme.name.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night');

// const toggleTheme = () => {
// 	return theme.global.current.value.dark ? theme.change('light') : theme.change('dark');
// };

</script>

<template>
	<div v-if="$slots.alerts && alerts !== null">
		<div
			v-for="(alert, idx) in alerts"
			:key="idx"
			:text="alert.text.includes('null') ? '' : alert.text"
			:title="alert.title"
			type="warning"
		>
			{{ alert  }}
		</div>
	</div>
	<nav
		id="main-navigation"
		class="flex-md-row"
	>
			<div data-navbar="og-title">
				<h1>
					<NuxtLink to="/">
						<slot name="home" />
					</NuxtLink>
				</h1>
			</div>
			<div data-navbar="page-title">
				<h2>
					<slot name="weather" />
				</h2>
			</div>
			<div data-navbar="actions">
				<div class="flex-sm-row">
					<slot name="location-settings" />
					<button>Toggle Theme</button>
					<!-- <button
						class="ml-2" 
						variant="flat"
						:icon="current"
						@click="toggleTheme"
					/> -->
				</div>
			</div>
			<hr aria-hidden="true"/>
	</nav>
</template>