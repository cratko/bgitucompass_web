
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
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="1">
            One
            <v-card-text class="text-center">
              <v-btn
                :disabled="!length"
                text="Remove Tab"
                variant="text"
                @click="length--"
              ></v-btn>
        
              <v-divider
                class="mx-4"
                vertical
              ></v-divider>
        
              <v-btn
                text="Add Tab"
                variant="text"
                @click="length++"
              ></v-btn>
            </v-card-text>
          </v-tabs-window-item>
          <v-tabs-window-item value="2">
            Two
            <v-card-text class="text-center">
              <v-btn
                :disabled="!length"
                text="Remove Tab"
                variant="text"
                @click="length--"
              ></v-btn>
        
              <v-divider
                class="mx-4"
                vertical
              ></v-divider>
        
              <v-btn
                text="Add Tab"
                variant="text"
                @click="length++"
              ></v-btn>
            </v-card-text>
          </v-tabs-window-item>
          <v-tabs-window-item value="3">
            Three
            <v-card-text class="text-center">
              <v-btn
                :disabled="!length"
                text="Remove Tab"
                variant="text"
                @click="length--"
              ></v-btn>
        
              <v-divider
                class="mx-4"
                vertical
              ></v-divider>
        
              <v-btn
                text="Add Tab"
                variant="text"
                @click="length++"
              ></v-btn>
            </v-card-text>
          </v-tabs-window-item>
        </v-tabs-window>
    

      </v-card>
</template>

<style scoped>
.v-tab.v-tab.v-btn {
    min-width: calc(100vw / 6);
}
</style>