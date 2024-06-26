
<script setup>
import {ref, reactive} from 'vue';

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

function getDateWeek(date) {
    const currentDate = 
        (typeof date === 'object') ? date : new Date();
    const januaryFirst = 
        new Date(currentDate.getFullYear(), 0, 1);
    const daysToNextMonday = 
        (januaryFirst.getDay() === 1) ? 0 : 
        (7 - januaryFirst.getDay()) % 7;
    const nextMonday = 
        new Date(currentDate.getFullYear(), 0, 
        januaryFirst.getDate() + daysToNextMonday);
 
    return (currentDate < nextMonday) ? 52 : 
    (currentDate > nextMonday ? Math.ceil(
    (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
}

function getWeekFromDaysOfWeek(daysOfWeek, n) {
    return daysOfWeek.get(pickedWeek).value
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

const scheduleLength = 6;

let pickedDay = ref(curr);
let pickedDayFormat = ref(getEnDate(curr))
let pickedWeek = ref(getDateWeek(curr));
console.log(pickedWeek)

let daysOfWeek = reactive(new Map([]))

let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
for(let week = 0; week <= 2; week++) {
  let ff = first - 7 * week
  let dates = []
  for(let i = 1; i <= 6; i++) {
  let date = new Date(curr.setDate(ff+i))

  dates.push(date)
    }
  daysOfWeek.set(getDateWeek(dates[0]), dates);
}


</script>

<template>
  <client-only placeholder="Loading...">

  <v-card>
    <v-window v-model="pickedWeek">
      <v-window-item v-for="n in daysOfWeek" :key="n[0]" :value="n[0]">
        <div class="currentDateChip d-flex justify-center">
          <h1 class="text-md-h4"> {{ new Date(pickedDay).getMonthName() }} {{ n[0] }} </h1>
        </div>
        <v-tabs
        v-model="pickedDayFormat"
        grow
        color="blue"
      >
        <v-tab
          v-for="dayOfWeek in daysOfWeek.get(pickedWeek)"
          :key="getEnDate(dayOfWeek)"
          :value="getEnDate(dayOfWeek)"
        >
        <div class="dayOfWeek d-flex align-center flex-column">
          <span class="dayNumber">{{dayOfWeek.toLocaleString("ru", onlyDayOptions)}}</span>
          <span class="dayTitle">{{dayOfWeek.getDayName()}}</span>
        </div>
        </v-tab>
      </v-tabs>
      <v-window v-model="pickedDayFormat">
        <v-window-item v-for="day in daysOfWeek.get(pickedWeek)" :key="getEnDate(day)" :value="getEnDate(day)">
          <v-card class="d-flex justify-center align-center" height="200px">
            <span class="text-h2">Card {{pickedDayFormat}}</span>
          </v-card>
        </v-window-item>
      </v-window>
    </v-window-item>
    </v-window>
    </v-card>

      </client-only>
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