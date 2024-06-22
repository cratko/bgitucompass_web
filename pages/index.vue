 
<script setup>
import {ref} from 'vue';

const activeTab = ref(0);
const navigations = [
    resolveComponent("ScreenSchedule"),
    resolveComponent("ScreenTeachers"),
    resolveComponent("ScreenProfile")
];

const loading = defineModel();

</script>

<template>
    <v-tabs-window 
    v-model="activeTab"
    v-show="!loading"
    >
        <v-tabs-window-item 
        v-for="i in navigations" 
        value="activeTab">
            <KeepAlive>
                <component :is="navigations[activeTab]"/>
            </KeepAlive>
        </v-tabs-window-item>
    </v-tabs-window>
    <transition>
      <NavBar 
      v-model="activeTab"
      v-show="!loading"/>
    </transition>
  
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