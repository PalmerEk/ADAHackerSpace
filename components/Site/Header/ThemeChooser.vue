<template>
  <v-btn icon @click="toggleTheme">
    <v-icon>mdi-theme-light-dark</v-icon>
  </v-btn>
</template>

<script>
import { useTheme } from "vuetify";

export default {
  name: "ThemeChooser",

  setup() {
    const theme = useTheme();

    return {
      theme,
      toggleTheme: () => (theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"),
    };
  },
};
</script>
