<script setup>
	import { ChevronDownIcon } from "@heroicons/vue/20/solid";

	const wallet = useWallet();
</script>

<template>
	<div v-show="!wallet.isReady" role="status">
		<Spinner />
	</div>

	<div v-show="wallet.isReady && !wallet.isConnected">
		<button
			data-popover-target="popover-wallet-list"
			type="button"
			class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 pb-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			Connect Wallet
			<span class="ml-2 w-2">
				<ChevronDownIcon class="h-6 w-6" />
			</span>
		</button>
		<div
			data-popover
			id="popover-wallet-list"
			role="tooltip"
			class="absolute z-10 invisible inline-block w-128 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
		>
			<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
				<h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">Connect wallet</h5>
				<CardanoWalletList />
			</div>
		</div>
	</div>

	<div v-show="wallet.isReady && wallet.isConnected">
		<button
			data-popover-target="popover-wallet-card"
			data-popover-trigger="click"
			type="button"
			class="flex h-[50px] items-center space-x-[13px] divide-x divide-gray-300 rounded-md border border-gray-300 px-[13px] leading-[16px] shadow-sm hover:bg-gray-50 xl:h-[38px] dark:divide-dark-600 dark:border-dark-600 dark:text-gray-50 dark:hover:bg-dark-700 w-full xl:w-auto"
		>
			<div v-if="wallet.balance !== null" class="whitespace-nowrap text-primary-600">
				{{ parseFloat(wallet.balance.toFixed(2)).toLocaleString() }} {{ wallet.currency_symbol }}
			</div>
			<div v-else role="status">
				<Spinner />
			</div>

			<div class="flex h-full flex-1 items-center justify-center space-x-2 xl:h-auto xl:flex-auto xl:justify-start xl:pl-3">
				<svg
					v-if="wallet.ada_handle"
					height="16px"
					width="12px"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 235.517 235.517"
					xml:space="preserve"
				>
					<g>
						<path
							style="fill: #0cd15b"
							d="M118.1,235.517c7.898,0,14.31-6.032,14.31-13.483c0-7.441,0-13.473,0-13.473 c39.069-3.579,64.932-24.215,64.932-57.785v-0.549c0-34.119-22.012-49.8-65.758-59.977V58.334c6.298,1.539,12.82,3.72,19.194,6.549 c10.258,4.547,22.724,1.697,28.952-8.485c6.233-10.176,2.866-24.47-8.681-29.654c-11.498-5.156-24.117-8.708-38.095-10.236V8.251 c0-4.552-6.402-8.251-14.305-8.251c-7.903,0-14.31,3.514-14.31,7.832c0,4.335,0,7.843,0,7.843 c-42.104,3.03-65.764,25.591-65.764,58.057v0.555c0,34.114,22.561,49.256,66.862,59.427v33.021 c-10.628-1.713-21.033-5.243-31.623-10.65c-11.281-5.755-25.101-3.72-31.938,6.385c-6.842,10.1-4.079,24.449,7.294,30.029 c16.709,8.208,35.593,13.57,54.614,15.518v13.755C103.79,229.36,110.197,235.517,118.1,235.517z M131.301,138.12 c14.316,4.123,18.438,8.257,18.438,15.681v0.555c0,7.979-5.776,12.651-18.438,14.033V138.12z M86.999,70.153v-0.549 c0-7.152,5.232-12.657,18.71-13.755v29.719C90.856,81.439,86.999,77.305,86.999,70.153z"
						/>
					</g>
				</svg>
				<span v-if="wallet.ada_handle">{{ wallet.ada_handle }}</span>
				<div v-if="!wallet.ada_handle">{{ wallet.address?.slice(0, 6) }}...{{ wallet.address?.slice(-6) }}</div>
				<ChevronDownIcon class="h-4 w-4" />
			</div>
		</button>

		<div
			data-popover
			id="popover-wallet-card"
			role="tooltip"
			class="absolute z-10 invisible inline-block w-128 text-sm font-light text-gray-500 transition-opacity opacity-0 duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
		>
			<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
				<CardanoWalletCard />
			</div>
		</div>
	</div>
</template>
