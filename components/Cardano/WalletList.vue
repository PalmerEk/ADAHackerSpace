<script setup>
const { SUPPORTED_WALLETS } = useWallets();
const wallet = useWallet();

onMounted(async () => {});
</script>

<template>
  <!---Wallet - User / Connect-->
  <client-only>
    <v-list shaped>
      <v-list-item
        v-for="supportedWallet in SUPPORTED_WALLETS"
        :key="supportedWallet.provider"
        rounded="shaped"
        active-color="primary"
        :disabled="!supportedWallet.installed"
        @click="wallet.toggle(supportedWallet.provider)"
      >
        <template v-slot:append>
          <v-avatar end v-if="supportedWallet.provider == wallet.wallet?.provider && wallet.isConnected">
            <v-btn variant="text" color="green" icon="mdi-check-bold"></v-btn>
          </v-avatar>
        </template>

        <v-avatar start>
          <v-img :src="supportedWallet.icon"></v-img>
        </v-avatar>
        <v-list-item-title v-text="supportedWallet.name"></v-list-item-title>

        <div v-if="!supportedWallet.installed">
          <a :href="supportedWallet.urls.google" rel="noreferrer noopener" target="_blank">
            <v-btn variant="text" color="green" icon="mdi-open-in-new">Install</v-btn>
          </a>
        </div>
      </v-list-item>
    </v-list>
  </client-only>
</template>
