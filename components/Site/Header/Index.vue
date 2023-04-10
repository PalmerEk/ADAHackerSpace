<script setup>
	const wallet = useWallet();

	const settingsDialog = ref(false);
</script>

<template>
	<v-app-bar app>
		<v-app-bar-nav-icon>
			<NuxtLink to="/"><v-icon icon="mdi-gavel"></v-icon></NuxtLink>
		</v-app-bar-nav-icon>

		<v-app-bar-title><NuxtLink to="/">ADAHackerSpace</NuxtLink></v-app-bar-title>

		<v-spacer></v-spacer>

		<template v-slot:append>
			<!-- Wallet -->
			<CardanoConnectWallet></CardanoConnectWallet>

			<!---User Profile? -->
			<!-- <v-btn v-if="wallet.isConnected" icon="mdi-account"></v-btn> -->

			<!-- Settings -->
			<v-dialog v-model="settingsDialog" scrollable>
				<template v-slot:activator="{ props }">
					<v-btn icon="mdi-cog-outline" v-bind="props"></v-btn>
				</template>

				<SiteHeaderSettings @close="settingsDialog = false" />
			</v-dialog>

			<SiteHeaderThemeChooser />

			<!-- Social? -->
			<!-- <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-horizontal" v-bind="props"></v-btn>
        </template>

        <HeaderSocialMenu />
      </v-menu> -->
		</template>
	</v-app-bar>
</template>
