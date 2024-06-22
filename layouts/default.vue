<script setup lang="ts">

import {onMounted} from 'vue'
// Init telegram Script
onMounted(() => {
const plugin = document.createElement("script");
plugin.setAttribute(
    "src",
    "https://telegram.org/js/telegram-web-app.js"
);
plugin.async = true;
document.head.appendChild(plugin);
});

 
// Init Nuxt Object
const nuxtApp = useNuxtApp();

//'Loading' Reactive Variable
const loading = ref(true);

// Preloader delay miliseconds
const preloader_delay = 1000;

// Checking render status
nuxtApp.hook("page:start", () => {
    loading.value = true;
});

//const { data, error, execute, refresh } = await useFetch('http://5.42.74.97/getGroupIDByTGID?telegramID=451469272')

//console.log(data.value);
nuxtApp.hook("page:finish", () => {
    if (typeof window.telegram.WebApp != 'undefined') {
        setTimeout(() => {      
            loading.value = false;
        }, preloader_delay);
    }
    console.log(window.telegram)
});

</script>

<template>
    <transition>
        <Preloader v-if="loading"></Preloader>
      </transition> 
    <NuxtPage v-model="loading"/>
    
</template>

<style>

/* Preloader transition*/
.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>