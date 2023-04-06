<script setup>
	import { withBase } from "ufo";
	import { useRuntimeConfig, computed } from "#imports";

	const props = defineProps({
		src: {
			type: String,
			default: "",
		},
		alt: {
			type: String,
			default: "",
		},
		width: {
			type: [String, Number],
			default: undefined,
		},
		height: {
			type: [String, Number],
			default: undefined,
		},
	});

	const refinedSrc = computed(() => {
		if (props.src?.startsWith(".")) {
			// TODO: Handle relative paths (ie. assets or bettery yet .assets)  See if we can just say if it doesn't start with http then use base url as the lesson base?
			// Maybe have to create full URL to github?
			return withBase("/connect-1.png", "http://localhost:3000/lessons/en/js_dao/assets");
		}
		if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
			// Since we'renot using local content folders
			//return withBase(props.src, useRuntimeConfig().app.baseURL);
		}
		return props.src;
	});
</script>

<template>
	<!-- <h2>Image URL: {{ refinedSrc }}</h2> -->
	<img :src="refinedSrc" :alt="alt" :width="width" :height="height" />
</template>
