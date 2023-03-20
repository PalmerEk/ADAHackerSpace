<template>
	<h1>Welcome Contributors!</h1>
	<!-- TODO: List pending lessons (Where do we get these... gun.js?) // TODO: List approved lessons (get all lessons from wallet based on policy id) -->
	<NuxtLink :to="`/contributor/submit-lesson`">
		<button
			type="button"
			class="inline-block px-7 py-3 border-2 font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
			data-mdb-ripple="true"
			data-mdb-ripple-color="light"
		>
			Submit Lesson
		</button>
	</NuxtLink>
</template>
