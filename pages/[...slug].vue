<script setup>
	import { useClipboard } from "@vueuse/core";
	const route = useRoute();
	const slug = route.params.slug;

	const { copy, copied, text } = useClipboard();

	const contentURL = slug.join("/");
	const lessonURL = slug.slice(0, 3).join("/");
	const overviewURL = slug.slice(0, 3).concat("overview").join("/");

	const { data: content } = await useAsyncData(contentURL, () => {
		return queryContent(contentURL).findOne();
	});

	const { data: surrounding } = await useAsyncData(`nav_${contentURL}`, () => {
		return queryContent(lessonURL).where({ _partial: false }).only(["_path", "title"]).sort({ _file: 1 }).findSurround(`/${contentURL}`);
	});

	const { data: overview } = await useAsyncData(overviewURL, () => {
		return queryContent(overviewURL).findOne();
	});

	const next = computed(() => {
		const [prev, next] = surrounding.value;
		return next;
	});

	const prev = computed(() => {
		const [prev, next] = surrounding.value;
		return prev;
	});

	const breadcrumbs = ref([
		{
			title: "Builds",
			href: "/builds",
		},
		{
			title: overview.value.title,
			href: `/overview/${overviewURL}`,
		},
		{
			title: content.value.title,
			href: content._path,
		},
	]);

	const githubLink = computed(() => {
		return `https://github.com/PalmerEk/ADAHackerSpace-Lessons/edit/main${content.value?._file.slice(7)}`;
	});

	const copyLink = () => {
		copy(window.location.href);
	};
</script>

<template>
	<NuxtLayout name="lesson">
		<template #toc>
			<v-navigation-drawer>
				<v-img :src="overview.image" cover></v-img>
				<h2>{{ overview.title }}</h2>
				<hr />
				<LessonTOC :lessonURL="lessonURL" :currentURL="contentURL" />
			</v-navigation-drawer>
		</template>

		<v-row>
			<v-col cols="12" sm="12">
				<v-breadcrumbs :items="breadcrumbs" class="bg-grey-darken-4">
					<v-spacer />
					<ClientOnly>
						<v-btn icon title="Copy link" @click.prevent="copyLink" variant="text">
							<icon v-if="copied" name="mdi:link-variant-plus" size="24" />
							<icon v-else name="mdi:link-variant" size="24" />
						</v-btn>
					</ClientOnly>

					<v-btn icon title="Edit on Github" variant="text">
						<a :href="githubLink" target="_blank">
							<icon name="mdi:github" size="24" />
						</a>
					</v-btn>
				</v-breadcrumbs>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" sm="12">
				<ContentRenderer :value="content">
					<ContentRendererMarkdown :value="content" />
				</ContentRenderer>
			</v-col>
		</v-row>

		<v-container>
			<v-row>
				<!-- TODO: Submit requirements after each section before being allowed to continue IF lesson yaml contains proof? -->
				<v-col cols="6" sm="6">
					<v-btn v-if="prev && prev._path !== overview._path" variant="outlined" rounded="xl" size="large" :to="prev._path">
						<icon name="mdi:arrow-left-bold" /> {{ prev.title }}
					</v-btn>
				</v-col>

				<v-col cols="6" sm="6">
					<v-btn v-if="next" class="float-right" variant="outlined" rounded="xl" size="large" :to="next._path">
						{{ next.title }} <icon name="mdi:arrow-right-bold" />
					</v-btn>
				</v-col>
			</v-row>
		</v-container>

		<template #contents>
			<v-navigation-drawer v-if="content.body.toc.links.length" location="right" width="256">
				<h4>Contents</h4>
				<v-list :lines="false" density="compact" nav>
					<v-list-item v-for="link in content.body.toc.links" :key="link.id" active-color="primary">
						<v-list-item-title>
							<NuxtLink :to="`#${link.id}`">
								{{ link.text }}
							</NuxtLink>
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>
		</template>
	</NuxtLayout>
</template>
