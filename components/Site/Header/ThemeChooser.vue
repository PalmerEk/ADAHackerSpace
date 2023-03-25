<script setup>
	import { useTheme } from "vuetify";
	const appConfig = useAppConfig();

	const theme = useTheme();
	const toggleTheme = () => (appConfig.theme = theme.global.name.value = theme.global.current.value.dark ? "light" : "dark");
</script>

<template>
	<v-btn icon @click="toggleTheme">
		<v-icon>mdi-theme-light-dark</v-icon>
	</v-btn>
</template>
