<script lang="ts" setup>
const { alerts } = defineProps<{
	alerts?: { title: string; text: string }[] | null;
}>();
const theme = useTheme();
const current = ref(theme.name.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night');

const toggleTheme = () => {
	return theme.global.current.value.dark ? theme.change('light') : theme.change('dark');
};

</script>

<template>
	<div v-if="$slots.alerts && alerts !== null">
		<v-alert
			v-for="(alert, idx) in alerts"
			:key="idx"
			:text="alert.text.includes('null') ? '' : alert.text"
			:title="alert.title"
			type="warning"
		/>
	</div>
	<nav
		id="main-navigation"
	>
			<v-col>
				<v-row>
					<h1>
						<NuxtLink to="/">
							<slot name="home" />
						</NuxtLink>
					</h1>
					<v-divider vertical />
					<h2>
						<slot name="weather" />
					</h2>
				</v-row>
			</v-col>
			<v-col>
				<v-row justify="end">
					<slot name="location-settings" />
					<v-btn
						class="ml-2" 
						variant="flat"
						:icon="current"
						@click="toggleTheme"
					/>
				</v-row>
			</v-col>
	</nav>
</template>

<style>
	nav {
		display: flex;
		z-index: 1;
		> div > div {
			align-items: center;
			gap: 0.5em;
		}
	}
</style>