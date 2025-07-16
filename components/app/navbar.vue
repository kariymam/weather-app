<script lang="ts" setup>
const { alerts } = defineProps<{
	alerts?: { title: string; text: string }[] | null;
}>();
const theme = useTheme();
const current = shallowRef('dark');
const toggleTheme = () => {
	theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
	current.value = theme.global.current.value.dark ? 'dark' : 'light';
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
		class="v-container"
	>
		<v-row
			align="center"
		>
			<v-col
				v-if="$slots.home"
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
				<v-btn
					:prepend-icon="current === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
					variant="text"
					@click="toggleTheme"
				/>
			</v-col>
		</v-row>
	</nav>
</template>
