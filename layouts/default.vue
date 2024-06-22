<script setup lang="ts">

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
nuxtApp.hook("page:finish", () => {
setTimeout(() => {      
    loading.value = false;
}, preloader_delay);
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