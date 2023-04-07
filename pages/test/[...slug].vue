<script setup>
	import { useClipboard } from "@vueuse/core";
	const route = useRoute();
	const slug = route.params.slug;

	const contentURL = slug.slice(0, 1).join("/");

	const { data: content } = await useAsyncData(contentURL, () => {
		return queryContent(contentURL).findOne();
	});

	const breadcrumbs = ref([
		{
			title: "test",
			href: "/test",
		},
		{
			title: content.value.title,
			href: content._path,
		},
	]);
</script>

<template>
	<NuxtLayout name="lesson">
		<v-row>
			<v-col cols="12" sm="12">
				<v-breadcrumbs :items="breadcrumbs" class="bg-grey-darken-4"> </v-breadcrumbs>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" sm="12">
				<ContentRenderer :value="content">
					<ContentRendererMarkdown :value="content" />
				</ContentRenderer>
				<!-- TODO: Submit requirements after each section before being allowed to continue? -->
			</v-col>
		</v-row>

		<v-container>
			<v-row> Submit requirement? </v-row>
		</v-container>
	</NuxtLayout>
</template>
