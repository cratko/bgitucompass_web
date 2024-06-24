<template>
    <v-container style="height: 100dvh">
      <v-row align-content="center" class="fill-height" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">
          <NuxtImg 
          preload 
          sizes="20vw sm:20vw md:20vw"
          src="/logo.png"/>
        </v-col>
        <v-col cols="6">
          <transition>
            <v-progress-linear
            color="blue"
            height="6"
            indeterminate
            rounded
          ></v-progress-linear>
          </transition>
        </v-col>
      </v-row>
    </v-container>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
transition: opacity 0.6s ease;
}

.v-enter-from,
.v-leave-to {
opacity: 0;
}
</style>
