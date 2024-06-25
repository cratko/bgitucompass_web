
<script setup>
import {ref} from 'vue';

(function() {
    var days = ['вск','пн','вт','ср','чт','пт','сб'];
    
    var months = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
})();

function getEnDate(date) {
  return date.toLocaleDateString("en")
}

var options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timezone: 'UTC'
};

var onlyDayOptions = {
  day: 'numeric',
};

const curr = new Date; // get current date
const currentDate = curr.toLocaleString("ru", options);

let pickedDay = ref(currentDate);
let pickedWeek = ref(0);

let scheduleLength = ref(1);

let countOfWeeks = ref(1);

/* new Date().toLocaleString("ru", options); */
const currentDayOfWeek = new Date().getDayName();

let daysOfWeek = []

let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
for(let i = 1; i <= 6; i++) {
  let date = new Date(curr.setDate(first+i))
  daysOfWeek.push( date );
}

watch(pickedDay, async() => {
  console.log('Changed Tab');
})
</script>

<template>


    <v-card>
      <v-window v-model="pickedWeek">
        <v-window-item v-for="n in scheduleLength" :key="n" :value="n">
          <div class="currentDateChip d-flex justify-center">
            <h1 class="text-md-h4"> {{ new Date(pickedDay).getMonthName() }} </h1>
          </div>
          <v-tabs
          v-model="pickedDay"
          grow
          color="blue"
        >
          <v-tab
            v-for="dayOfWeek in daysOfWeek"
            :key="dayOfWeek"
            :value="getEnDate(dayOfWeek)"
          >
          <div class="dayOfWeek d-flex align-center flex-column">
            <span class="dayNumber">{{dayOfWeek.toLocaleString("ru", onlyDayOptions)}}</span>
            <span class="dayTitle">{{dayOfWeek.getDayName()}}</span>
          </div>
          </v-tab>
        </v-tabs>
        <v-window v-model="pickedDay">
          <v-window-item v-for="day in daysOfWeek" :key="day" :value="pickedDay">
            <v-card class="d-flex justify-center align-center" height="200px">
              <span class="text-h2">Card {{ n }} {{pickedDay}}</span>
            </v-card>
          </v-window-item>
        </v-window>
      </v-window-item>
      </v-window>



      </v-card>
</template>

<style scoped>

.v-tab.v-tab.v-btn {
    max-width: calc(100vw / 6);
}

.currentDateChip {
  padding: 10px;
}

.dayOfWeek {
  gap: 3px;
}

.dayOfWeek .dayTitle {
  font-size: 10px;
}

.dayOfWeek .dayNumber {
  font-size: 15px;
  font-weight: 700;
}

.v-tab.v-tab.v-btn {
  min-width: 0px;
}
</style>