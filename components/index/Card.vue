<template>
    <div class="text-center custom-div">
        <h1>ADA Hacker Space</h1>
        <h3 class="mt-1 mb-14 text-medium-emphasis">Cardano Training Ground</h3>
        <v-btn 
            to="/builds" 
            ripple
            size="large"
            block
            rounded="10"
            class="custom-button"
        >
            Start Hacking
        </v-btn>
    </div>
</template>

<script setup lang="ts">
    import {} from '#app'
    import { useTheme } from "vuetify"
    const theme = useTheme()

    const props = defineProps<{
        dark?: boolean
    }>()

    const backgroundColor = computed(() => theme.global.current.value.dark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.90)')
    const boxShadow = computed(() => theme.global.current.value.dark ? 'none' : '0 5px 15px #aaa')
    const border = computed(() => theme.global.current.value.dark ? '2px solid #bb86fc' : 'none')
</script>

<style lang="scss">
    .custom-div {
        animation: fade-in 1.15s linear;
    }

    @keyframes spin {
		from { transform: rotate(0deg) }
		to { transform: rotate(360deg) }
	}

	@keyframes fade-in {
		from { filter: blur(14px); opacity: 0; }
		to { filter: blur(0px); opacity: 1; }
	}
</style>