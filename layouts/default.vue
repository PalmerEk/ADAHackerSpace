<script setup></script>

<template>
	<v-app>
		<SiteHeader />

		<v-main>
			<v-container>
				<slot />
			</v-container>
		</v-main>
	</v-app>
</template>
