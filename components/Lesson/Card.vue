<script setup>
	defineProps({
		lesson: {
			type: Object,
			required: true,
		},
	});
</script>

<template>
	<div class="bg-white block rounded-lg shadow-lg mb-6 lg:mb-0" data-mdb-ripple="true" data-mdb-ripple-color="light">
		<NuxtLink :to="`/lesson/${lesson.id}/step/0`">
			<div class="relative overflow-hidden bg-no-repeat bg-cover">
				<img :src="lesson.image" class="w-full rounded-t-lg" />
				<a href="#!">
					<div
						class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
						style="background-color: rgba(251, 251, 251, 0.15)"
					></div>
				</a>
				<svg class="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="left: 0; bottom: 0">
					<path
						fill="#fff"
						d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
					></path>
				</svg>
			</div>
			<div class="p-6">
				<h5 class="font-bold text-lg mb-3">{{ lesson.title }}</h5>
				<p class="mb-4 pb-2">
					{{ lesson.description }}
				</p>
				<NuxtLink :to="`/lesson/${lesson.id}/overview`">
					<button
						data-mdb-ripple="true"
						data-mdb-ripple-color="light"
						class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
					>
						Learn more
					</button>
				</NuxtLink>
			</div>
		</NuxtLink>

		<div class="p-6">
			<!-- TODO: Link to pool.pm reward token if token? -->
			<button
				v-for="reward in lesson.docket.rewards"
				data-mdb-ripple="true"
				data-mdb-ripple-color="light"
				class="px-6 py-2.5 font-medium text-xs leading-tight shadow-md"
			>
				<h5>{{ reward.quantity }} {{ reward.name }}</h5>
				<img :src="reward.image" class="w-10 h-10 rounded-full inline-block" :title="reward.name" />
			</button>
		</div>
	</div>
</template>
