<script lang="ts" setup>
const { alerts } = defineProps<{
	alerts?: { title: string; text: string }[] | null;
}>();
const theme = useTheme();
const current = shallowRef('dark');
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
		id="main"
	>
	<v-col>
		<v-row
			align="center"
		>
			<v-col
				class="link-home"
			>
				<h1>
					<NuxtLink to="/">
						<slot name="home" />
					</NuxtLink>
				</h1>
			</v-col>
			<v-col
				align="center"
				cols="6"
			>
				<slot name="location-settings" />
			</v-col>
			<v-col
				align="end"
			>
				<slot name="weather" />
				<v-btn
					:prepend-icon="current === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
					variant="text"
					@click="toggleTheme"
				/>
			</v-col>
		</v-row>
	</v-col>
	</nav>
</template>

<style>
	nav {
		display: flex;
		z-index: 1;
	}
</style>