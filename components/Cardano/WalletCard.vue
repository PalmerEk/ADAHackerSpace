<script setup>
	import { ArrowRightOnRectangleIcon } from "@heroicons/vue/20/solid";
	import { DocumentDuplicateIcon } from "@heroicons/vue/24/outline";
	import { useClipboard, usePermission } from "@vueuse/core";

	const { isSupported: isClipboardSupported, copy, copied } = useClipboard();

	const wallet = useWallet();

	const copyAddress = () => {
		copy(wallet.value.ada_handle);
	};

	const changeHandle = () => {
		// TODO: Available handles popup
		//wallet.value.setDefaultHandle()
		//wallet.value.changeHandle();
	};
</script>

<template>
	<div class="flex space-x-4">
		<div class="flex shrink-0 h-[50px] w-[50px] items-center justify-center rounded-lg border border-gray-300 dark:border-dark-600">
			<img
				:alt="wallet.wallet?.name"
				:src="wallet.wallet?.icon"
				decoding="async"
				data-nimg="intrinsic"
				style="position: relative; box-sizing: border-box; border: none; margin: auto; display: block; width: 30px; height: 30px"
			/>
		</div>
		<div class="flex flex-1 flex-col xl:flex-auto">
			<div class="flex items-center justify-between">
				<div class="text-lg font-semibold">{{ wallet.wallet?.name }}</div>
				<div class="rounded border border-gray-300 py-[2px] px-2 text-xs dark:border-dark-600">
					<div class="flex flex-nowrap items-center space-x-[6px]">
						<div class="h-[6px] w-[6px] rounded-full bg-green-500"></div>
						<div class="environment-info">{{ wallet.network }}</div>
					</div>
				</div>
			</div>
			<div class="section-address mt-1 flex items-center justify-between text-gray-500 dark:text-gray-400">
				<span v-if="wallet.ada_handle">${{ wallet.ada_handle }}</span>

				<button
					class="flex select-none items-center justify-center whitespace-nowrap leading-none font-normal transition duration-300 cursor-pointer border-none shadow-none h-[38px] text-sm leading-[16px] rounded-lg py-[11px] px-[13px] !h-[24px] !py-0"
					tabindex="0"
					@click="changeHandle"
				>
					<svg
						v-if="wallet.ada_handles.length > 0"
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
						</g></svg
					><span class="ml-px text-[#0CD15B] font-semibold">Change</span>
				</button>
				<button v-if="isClipboardSupported" class="ml-2" @click="copyAddress">
					<DocumentDuplicateIcon v-if="!copied" class="h-6 w-6 dark:text-primary-600" />
					<span v-else>Copied!</span>
				</button>
			</div>
		</div>
	</div>
	<div class="h-px bg-gray-300 dark:bg-white dark:bg-opacity-20 mt-5"></div>
	<button
		class="flex select-none items-center justify-center whitespace-nowrap leading-none font-normal transition duration-300 cursor-pointer border border-gray-300 bg-white text-gray-700 dark:border-dark-600 dark:bg-dark-800 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-dark-700 h-[44px] text-sm leading-[20px] rounded-[10px] py-[12px] px-[17px] w-full btn-disconnect space-x-[14px] text-gray-500 dark:text-gray-400"
		tabindex="0"
		@click="wallet.disconnect"
	>
		<ArrowRightOnRectangleIcon class="h-6 w-6 text-gray-500" /> <span>Disconnect</span>
	</button>
</template>
