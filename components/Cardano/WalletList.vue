<script setup>
	import { ArrowTopRightOnSquareIcon, CheckIcon } from "@heroicons/vue/20/solid";

	const { SUPPORTED_WALLETS } = useWallets();
	const wallet = useWallet();
</script>

<template>
	<ul class="my-4 space-y-3">
		<li
			v-for="supportedWallet in SUPPORTED_WALLETS"
			:key="supportedWallet.provider"
			class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
			@click="wallet.toggle(supportedWallet.provider)"
		>
			<div class="h-[30px]">
				<img
					:alt="supportedWallet.name"
					:src="supportedWallet.icon"
					decoding="async"
					data-nimg="intrinsic"
					style="position: relative; box-sizing: border-box; border: none; margin: auto; display: block; width: 30px; height: 30px"
				/>
			</div>
			<span class="flex-1 ml-3 whitespace-nowrap">{{ supportedWallet.name }}</span>
			<span
				v-if="!supportedWallet.installed"
				class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
			>
				<a
					class="flex items-center space-x-2 px-2 py-1 rounded-lg dark:hover:bg-dark-600 hover:bg-primary-200 text-primary-600 bg-primary-100 dark:bg-dark-700 dark:text-gray-400"
					:href="supportedWallet.urls.google"
					rel="noreferrer noopener"
					target="_blank"
				>
					<span>Not installed </span><ArrowTopRightOnSquareIcon class="h-5 w-5" />
				</a>
			</span>

			<CheckIcon v-if="supportedWallet.provider == wallet.wallet?.provider && wallet.isConnected" class="h-6 w-6 text-green-500" />
		</li>
	</ul>
</template>
