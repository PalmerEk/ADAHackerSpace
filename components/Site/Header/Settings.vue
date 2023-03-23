<script setup>
	// const wallet = useWallet();
</script>

<template>
	<v-card>
		<v-card-title
			>Settings
			<v-btn icon="mdi-close" @click="$emit('close')"></v-btn>
		</v-card-title>
		<v-divider></v-divider>
		<v-card-text style="height: 300px">
			<SiteHeaderThemeChooser />
		</v-card-text>
	</v-card>
</template>
