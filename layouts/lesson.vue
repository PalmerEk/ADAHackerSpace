<template>
	<v-navigation-drawer>
		<slot name="toc" />
	</v-navigation-drawer>
	<v-row>
		<v-col cols="12">
			<v-card>
				<slot />
			</v-card>
		</v-col>
	</v-row>
</template>
