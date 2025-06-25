<script lang="ts" setup>
import type { MapboxResponseFeature } from '~/types';

const { searchFunc, selectFunc } = defineProps<{
	searchFunc: (value: string) => Promise<MapboxResponseFeature[] | undefined>;
	selectFunc: (value: MapboxResponseFeature) => void;
}>();
const selected = ref(null);
const items: Ref<MapboxResponseFeature[]> = ref([]);

const handleOnChange = async (value: string) => {
	const features = await searchFunc(value);
	if (features && features.length > 0) {
		items.value = features;
	}
};

const handleOnSelect = (value: MapboxResponseFeature | null) => {
	if (value === null) {
		return;
	}
	selectFunc(value);
};
</script>

<template>
	<div>
		{{ selected }}
		<v-autocomplete
			v-model="selected"
			append-inner-icon="mdi-magnify"
			auto-select-first
			class="mx-auto pt-4"
			density="comfortable"
			item-title="place_name"
			item-value="place_name"
			:items="items"
			label="Search"
			menu-icon=""
			placeholder="Anywhere, USA"
			return-object
			rounded
			variant="solo"
			@update:search="handleOnChange"
			@update:model-value="handleOnSelect"
		/>
	</div>
</template>
