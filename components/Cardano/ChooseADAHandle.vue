<script setup>
	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
	});

	const emits = defineEmits(["update:modelValue"]);

	const value = computed({
		get() {
			return props.modelValue;
		},
		set(value) {
			emits("update:modelValue", value);
		},
	});

	const wallet = useWallet();

	const changeHandle = (handle) => {
		wallet.value.setDefaultHandle(handle);
		value.value = false;
	};
</script>

<template>
	<v-row justify="space-around">
		<v-col cols="auto">
			<v-dialog transition="dialog-bottom-transition" width="auto" v-model="value">
				<template v-slot:default="{ isActive }">
					<v-card>
						<v-card-text>
							<v-card-title>
								<span>Select your ADAHandle</span>
								<v-btn variant="text" @click="value = false">
									<v-icon>mdi-close</v-icon>
								</v-btn>
							</v-card-title>
							<v-list>
								<v-list-item v-for="handle in wallet.ada_handles" :key="handle.handle" :value="handle.handle" rounded="xl">
									<v-list-item-title @click="changeHandle(handle.handle)">${{ handle.handle }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-card-text>
						<v-card-actions class="justify-end">
							<v-btn block variant="tonal" @click="changeHandle(null)">Clear ADAHandle</v-btn>
						</v-card-actions>
					</v-card>
				</template>
			</v-dialog>
		</v-col>
	</v-row>
</template>
