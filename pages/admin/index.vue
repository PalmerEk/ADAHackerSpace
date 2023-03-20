<script setup>
	definePageMeta({
		middleware: "auth-admin",
	});
</script>

<template>
	<div>
		<h1>Admin</h1>
		<h2>TODO:</h2>
		<ul>
			<li>
				<NuxtLink to="/admin/lessons/pending">
					<button
						type="button"
						class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
					>
						List pending lessons
					</button>
				</NuxtLink>
			</li>

			<li>
				<NuxtLink to="/admin/lessons/mint">
					<button
						type="button"
						class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
					>
						Mint Test
					</button>
				</NuxtLink>
			</li>

			<li>
				<NuxtLink to="/admin/lessons/burn">
					<button
						type="button"
						class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
					>
						Burn Test
					</button>
				</NuxtLink>
			</li>

			<li>Allow a creator to burn their Lesson Contributor token</li>
			<li>Issue Lesson completed token?</li>
		</ul>
	</div>
</template>
