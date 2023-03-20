<script setup>
	import { LockClosedIcon, PlayIcon, CheckIcon } from "@heroicons/vue/24/outline";

	defineProps({
		lesson: {
			type: Object,
			required: true,
		},
		section: {
			type: Number,
			default: () => 0,
		},
		step: {
			type: Number,
			default: () => 0,
		},
	});
</script>

<template>
	<div class="m-8 w-full pr-8 flex flex-col h-screen">
		<img :src="lesson.image" class="pr-4 pb-4 rounded-t-lg" />

		<div class="overflow-y-auto">
			<p v-for="(sec, secIndx) in lesson.docket.sections" :key="sec.title"
				class="uppercase mb-4 leading-6	text-sm font-bold text-normal-700"> 
				{{ sec.title }}
				
				<ul class="mt-2 list-none">
					<li v-for="(s, sIndx) in sec.steps" :key="`${sec.title}:${s.title}`"
					class="normal-case pt-1 pb-1 text-sm text-black font-medium"
					>
						<div class="flex flex-row">
							<div class="w-4 h-4 rounded-full mr-2">
								<CheckIcon v-if="secIndx < section || (secIndx === section && sIndx < step)" class="h-4 w-4 text-green-700" />
								<PlayIcon v-if="secIndx === section && sIndx === step" class="h-4 w-4 text-black" />
								<LockClosedIcon v-if="secIndx > section || (secIndx === section && sIndx > step)" class="h-4 w-4 text-gray-500" />
							</div>
							<div class="flex flex-col">
								<div :class="`text-sm font-medium text-left ${secIndx === section && sIndx === step ? 'text-black' : 'text-gray-400'}`">{{ s.title }}</div>
							</div>
						</div>
					</li>
				</ul>
			</p>

			<!-- TODO: Show some % complete for the lesson based off of current step and total steps -->
			<div class="bg-yellow-500 fixed bottom-0">
				<div class="flex flex-row">
					<div class="w-4 h-4 rounded-full mr-2">
						<CheckIcon class="h-4 w-4 text-green-700" />
					</div>
					<div class="flex flex-col">
						<div class="text-sm font-medium text-left text-gray-900">Completed</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>
