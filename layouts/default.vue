<script lang="ts" setup>
//
</script>

<template>
	<v-app>
		<AppNavbar place="Atlanta">
			<template #home>
				Home
			</template>
		</AppNavbar>
		<v-main>
			<slot />
		</v-main>
	</v-app>
</template>
