<template>
		<slot name="alerts" v-if="$slots.alerts" />
		<WeatherDashboard>
			<template #one>
        		<slot name="current"/>
			</template>
			<template #two>
				<slot name="week"/>
			</template>
			<template #three>
				<slot name="info"/>
			</template>
			<template #four>
				<slot name="hourly"/>
			</template>
		</WeatherDashboard>
    <slot />
	<slot name="video"/>
</template>
<style lang="css">
.background {
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
}

.background::before {
	content: '';
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
	display: block;
    position: absolute;
	background: rgba(var(--v-theme-background), 0.5);
	/* backdrop-filter: blur(5px); */
}

video {
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
	object-fit: cover;
}
</style>