<script setup>

  //Init reactive variable
  const model = defineModel();
</script>

<template>
    <v-layout class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation
        v-model="model"
        color="blue"
        grow
      >
        <v-btn 
        variant="plain" 
        :disabled="0==model"
        v-ripple.center>
          <v-icon>mdi-calendar-month</v-icon>
  
          <p class="navbar_title">расписание</p>
        </v-btn>
  
        <v-btn 
        variant="plain" 
        :disabled="1==model"
        v-ripple.center>
          <v-icon>mdi-account-group-outline</v-icon>
  
          <p class="navbar_title">преподаватели</p>
        </v-btn>

      </v-bottom-navigation>
    </v-layout>
  </template>

<style scoped>
.navbar_title {
    font-size: 0.75rem;
}

.v-btn--disabled {
  opacity: 1;
}
.v-btn--disabled:hover {
  opacity: 1;
}
</style>