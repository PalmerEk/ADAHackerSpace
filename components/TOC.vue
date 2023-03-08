<script setup>
	defineProps({
		steps: {
			type: Object,
			required: true,
		},

		currentStep: {
			type: Object,
			required: true,
		},

		currentLesson: {
			type: Object,
			required: true,
		},
	});
</script>

<template>
	<h2 v-for="(step, id) in steps" :key="id" :class="`text-sm font-medium text-gray-500 ${currentStep._id === step._id ? 'text-gray-900' : ''}`">
		<div v-if="currentStep._id === step._id">{{ step.title }}</div>
		<NuxtLink v-else :to="`/lesson/${currentLesson.value.id}/step/${id}`">{{ step.title }}</NuxtLink>
		<h3 v-for="link in step.body.toc.links" :key="`${id}:${link.id}`" class="pl-8">
			<NuxtLink v-if="currentStep._id === step._id" :to="`#${link.id}`">{{ link.text }}</NuxtLink>
			<NuxtLink v-else :to="`/lesson/${currentLesson.value.id}/step/${id}#${link.id}`">{{ link.text }}</NuxtLink>
			<h4 v-for="(childlink, n) in link.children" :key="`${id}:${link.id}:${n}`" class="pl-8">
				<NuxtLink v-if="currentStep._id === step._id" :to="`#${childlink.id}`">{{ childlink.text }}</NuxtLink>
				<NuxtLink v-else :to="`/lesson/${currentLesson.value.id}/step/${id}#${childlink.id}`">{{ childlink.text }}</NuxtLink>
			</h4>
		</h3>
	</h2>
</template>
