<template>
  <v-app>
    <NuxtLayout/>
  </v-app>
</template>

<script>
export default {
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "https://telegram.org/js/telegram-web-app.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
};
</script>
