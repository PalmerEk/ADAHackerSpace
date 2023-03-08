<script setup>
	defineProps({
		tabs: {
			type: Array,
			default: [],
		},
	});

	const activeTab = ref(0);

	const activateTab = (tabNumber) => {
    (activeTab.value = tabNumber)
  };

  const classTabContent = (t) => {
    if(t === activeTab.value) {
      return {
        'opacity-100': true,
      }
    } else {
      return {
        hidden: true,
        'opacity-0': true,
      }
    }
  }

  const classTab = (t) => {
    if(t === activeTab.value) {
      return {
        'opacity-100': true,
        'bg-neutral-400': true,
      }
    } else {
      return {
        'opacity-50': true,
        'bg-neutral-200': true,
      }
    }
  }
</script>

<template>
	<div class="border-2 rounded-md">
		<ul class="mb-4 flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row" id="tabs-tab3" role="tablist" data-te-nav-ref>
			<li v-for="(tab, i) in tabs" :key="`${tab}-tab`" role="presentation" :class="classTab(i)">
				<a
          @click="activateTab(i)"
					class="focus:border-transparent my-2 block border-x-0 border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
					data-te-toggle="pill"
					role="tab"
				>
					{{ tab }}
				</a>
			</li>
		</ul>

		<div>
			<div
				v-for="(tab, i) in tabs"
				:key="`${tab}-content`"
				class="transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
        :class="classTabContent(i)"
				role="tabpanel"
			>
				<slot :name="tab" />

			</div>
		</div>
	</div>
</template>
