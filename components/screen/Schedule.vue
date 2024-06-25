
<script setup>
import {ref} from 'vue';

let currentDate = ref();

let tab = ref(0);
let length = ref(6);

var options = {
  month: 'long',
  day: 'numeric',
  timezone: 'UTC'
};
currentDate = new Date().toLocaleString("ru", options);
</script>

<template>
    <div class="d-flex justify-center">
        <h1>{{currentDate}}</h1>
    </div>
    <v-card>
        <v-tabs
          v-model="tab"
          grow
        >
          <v-tab
            v-for="n in length"
            :key="n"
            :text="`${n}`"
            :value="n"
          >{{n}} чт</v-tab>
        </v-tabs>
        <v-window v-model="tab" show-arrows>
          <v-window-item v-for="n in length" :key="n" value="n">
            <v-card class="d-flex justify-center align-center" height="200px">
              <span class="text-h2">Card {{ n }}</span>
            </v-card>
          </v-window-item>
        </v-window>
    

      </v-card>
</template>

<style scoped>
.v-tab.v-tab.v-btn {
    min-width: calc(100vw / 6);
}
</style>