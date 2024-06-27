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

//const { data, error, execute, refresh } = await useFetch('http://5.42.74.97/getGroupIDByTGID?telegramID=451469272')

//console.log(data.value);

nuxtApp.hook("page:finish", () => {{
    try {
        const tg = window.Telegram.WebApp;
        tg.expand()
        console.log(tg.initDataUnsafe.user.id);

        setTimeout(() => {      
            loading.value = false;
        }, preloader_delay);
    } catch(err) {
        console.log(err);
    }


}});

</script>

<template>
    <v-alert
    border="top"
    v-if="noGroup"
    type="warning"
    variant="outlined"
    height="2vh"
    prominent
  >
    Выберите группу в боте БГИТУ Компас и перезагрузите приложение.
  </v-alert>
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