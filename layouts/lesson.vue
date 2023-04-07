<script setup></script>

<template>
	<v-app>
		<SiteHeader />

		<slot name="toc" />

		<v-main>
			<v-container class="prose">
				<slot />
			</v-container>
		</v-main>

		<slot name="contents" />
	</v-app>
</template>
