<template>
    <v-container style="height: 100dvh">
      <v-row align-content="center" class="fill-height" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">
          <NuxtImg 
          preload 
          sizes="30vw sm:20vw md:20vw"
          src="/logo.png"/>
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="blue"
            height="6"
            indeterminate
            rounded
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
</template>
