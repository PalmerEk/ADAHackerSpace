<script setup>
	import { useClipboard } from "@vueuse/core";

	const props = defineProps({
		code: {
			type: String,
			default: "",
		},
		language: {
			type: String,
			default: null,
		},
		filename: {
			type: String,
			default: null,
		},
		highlights: {
			type: Array,
			default: () => [],
		},
		meta: {
			type: String,
			default: null,
		},
	});

	const LANGUAGE_MAP = {
		vue: {
			text: "vue",
			backgroundColor: "#42b883",
			color: "white",
		},
		html: {
			text: "html",
			backgroundColor: "#42b883",
			color: "white",
		},
		md: {
			text: "md",
			backgroundColor: "#42b883",
			color: "white",
		},
		js: {
			text: "js",
			backgroundColor: "#f7df1e",
			color: "black",
		},
		ts: {
			text: "ts",
			backgroundColor: "#f7df1e",
			color: "black",
		},
		css: {
			text: "css",
			backgroundColor: "red",
			color: "black",
		},
		less: {
			text: "less",
			backgroundColor: "orange",
			color: "black",
		},
		bash: {
			text: "bash",
			backgroundColor: "gray",
			color: "black",
		},
	};

	const languageText = computed(() => (props.language ? LANGUAGE_MAP[props.language]?.text : null));
	const languageBackground = computed(() => (props.language ? LANGUAGE_MAP[props.language]?.backgroundColor : null));
	const languageColor = computed(() => (props.language ? LANGUAGE_MAP[props.language]?.color : null));

	const { copy, copied } = useClipboard();
</script>

<template>
	<v-container class="rounded-lg my-0 w-full pt-0">
		Props:
		<pre>{{ props }}</pre>

		<div class="mt-8 rounded-lg">
			<div class="border border-outline-opaque rounded-xl overflow-hidden" style="background-color: #1b1917">
				<div class="max-h-96 overflow-y-auto" style="background-color: #1f2937">
					<slot />
				</div>

				<div>
					<span v-if="filename" class="filename-text">
						{{ filename }}
					</span>
					<span v-if="languageText" :style="{ backgroundColor: languageBackground, color: languageColor }" class="float-left language-text">
						{{ languageText }}
					</span>

					<v-btn @click="copy(code)" color="primary" variant="text" class="float-right">
						<Icon v-if="copied" name="mdi:check" class="text-green" size="1.5em" />
						<Icon v-else name="mdi:content-copy" size="1.5em" />
					</v-btn>
				</div>
			</div>
		</div>
	</v-container>
</template>

<style scoped lang="scss">
	.filename-text {
		padding: 0.25rem 0.5rem;
		font-size: 14px;
		font-weight: bolder;
	}
	.language-text {
		font-size: 14px;
		margin-right: 1rem;
		text-transform: uppercase;
		border-radius: 1rem;
	}
</style>
