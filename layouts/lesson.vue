<script setup>
	// TODO: Decide what we actually use
	import {
		initAccordions,
		initCarousels,
		initCollapses,
		initDials,
		initDismisses,
		initDrawers,
		initDropdowns,
		initModals,
		initPopovers,
		initTabs,
		initTooltips,
	} from "flowbite";

	// initialize components based on data attribute selectors
	onMounted(() => {
		initAccordions();
		initCarousels();
		initCollapses();
		initDials();
		initDismisses();
		initDrawers();
		initDropdowns();
		initModals();
		initPopovers();
		initTabs();
		initTooltips();
	});
</script>

<template>
	<div>
		<nav class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
			<div class="px-6 w-full flex flex-wrap items-center justify-between">
				<div class="flex items-center">
					<NuxtLink class="navbar-brand text-blue-600" to="/">
						<svg class="w-5 h-5 ml-2 lg:ml-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
							<path
								fill="currentColor"
								d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
							></path>
						</svg>
					</NuxtLink>
				</div>
				<div class="flex items-center lg:ml-auto">
					<NuxtLink to="/examples">
						<button
							type="button"
							class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
						>
							MD Examples
						</button>
					</NuxtLink>

					<CardanoWalletConnect />
				</div>
			</div>
		</nav>

		<slot />
	</div>
</template>
