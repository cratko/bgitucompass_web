
<script setup>
import {ref, reactive} from 'vue';
import ScheduleLessonCard from '../ScheduleLessonCard.vue';

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

function getMonthNameById(id) {
  var months = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];

  return months[id-1];
}

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


function dateFromString(value) {
  if (typeof(value) == 'undefined') {
    const [month, day, year] = value.split('/');
    const newDate = new Date(year, month - 1, day);
    return (newDate);
  }

  return value
}

function getDaysOfWeek(week, year) {
  // Input validation (optional)
  week = parseInt(week);
  year = parseInt(year);
  if (week < 1 || week > 53 || isNaN(week) || isNaN(year)) {
    throw new Error("Invalid week number or year");
  }

  // Calculate the date for the first day of the week
  const d = new Date(year, 0, 1 + (week - 1) * 7);

  // Adjust to the previous Monday (ISO 8601 standard)
  d.setDate(d.getDate() - (d.getDay() || 7) + 1);

  // Create an array to store the dates
  const days = [];
  for (let i = 0; i < 6; i++) {
    const day = new Date(d);
    day.setDate(day.getDate() + i);
    days.push(day);
  }

  return days;
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

let pickedDayFormat = ref(
  getEnDate(curr)
)

console.log(pickedDayFormat.value)

let pickedWeekSchema = {
  weekNumber: getDateWeek(curr),
  year: new Date().getFullYear()
}

let pickedWeek = ref(pickedWeekSchema.weekNumber.toString() + '-' + pickedWeekSchema.year.toString())


const weeks = []
for (let i = 1; i <= 53; i++) { weeks.push(i) }

// start gen
function fillDaysOfWeeks(pickedWeek, pickedDayFormat) {
  let daysOfWeek = new Map([])

  let weekNumber = pickedWeek.value.split("-")[0]
  let year = pickedWeek.value.split("-")[1]

  for(let i = weekNumber - 1; i <= weekNumber + 1; i++) {
    let year_ = year;
    let week_ = i;

    if (i < 1) {
      year_--;
      week_ = 53;
    } else if(i > 53) {
      year_++;
      week_ = 1;
    }

    daysOfWeek.set(week_.toString() + '-' + year_.toString(), getDaysOfWeek(week_, year_));
 }

  return daysOfWeek
}

let daysOfWeek = reactive(fillDaysOfWeeks(pickedWeek, pickedDayFormat))


watch(pickedWeek,  (newWeek, oldWeek) => {
  pickedDayFormat.value = getEnDate(daysOfWeek.get(newWeek)[0])

  daysOfWeek = reactive(fillDaysOfWeeks(pickedWeek, pickedDayFormat, daysOfWeek))

  watch(pickedDayFormat, () => {
  pickedDayFormat.value = getEnDate(daysOfWeek.get(pickedWeek.value)[0])
}, {once: true})
})

let subjectsById = ref([])
let groupId = "77";

let loading_lessons = ref(true);
let lessons = ref(null);

await fetch('https://dev.bgitu-compass.ru/subjects?groupId=' + groupId)
    .then(response => response.json())
    .then(data => {
      
      subjectsById.value.push(data)
      
      console.log(subjectsById.value)

});


setTimeout(() => {      
            loading_lessons.value = false;
        }, 5000);


watch(pickedDayFormat, () => {
  let day_splitted = pickedDayFormat.value.split("/").reverse();
  [day_splitted[1], day_splitted[2]] = [day_splitted[2], day_splitted[1]];

  let pickedDayFormat_new = "";

  for(let i = 0; i < day_splitted.length; i++) {
    if (day_splitted[i].length == 1) {
      pickedDayFormat_new += "0" + day_splitted[i]
    } else {
      pickedDayFormat_new += day_splitted[i]
    }

    if (i != 2) {
      pickedDayFormat_new += "-"
    }
  }

  console.log(pickedDayFormat_new)
  loading_lessons.value = true;

  fetch('https://dev.bgitu-compass.ru/lessons?groupId=' + groupId + '&startAt=' + pickedDayFormat_new + '&endAt=' + pickedDayFormat_new)
    .then(response => response.json())
    .then(data => {
      console.log("DATA===")
      console.log(data)
      for( let i = 0; i < data.length; i++ ) {
        data[i]['subjectName'] = subjectsById.value[0].find(x => x.id === data[i]['subjectId']).name
      }
      data.sort(function(a, b) {
          return a['startAt'].split(":")[0] - b['startAt'].split(":")[0]
      });
      lessons = ref(data)
    });

    setTimeout(() => {      
            loading_lessons.value = false;
        }, 500);
    /*
    for(let i = 0; i < data.length; i++) {
      data[i]['subjectName'] = subjectsById[0].find(x => x.id === data[i]['subjectId']).name
    }*/

    
}, { immediate: true })


</script>

<template>
  <client-only placeholder="Loading...">
    <v-no-ssr>
  <v-card>
    <v-window v-model="pickedWeek">
      <v-window-item v-for="[key] in daysOfWeek" :key="key" :value="key">
        <div class="currentDateChip d-flex justify-center">
          <h1 class="text-md-h4"> {{ getMonthNameById(pickedDayFormat.split("/")[0]) }} </h1>
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
        <v-window-item v-for="day in daysOfWeek.get(pickedWeek)" :key="getEnDate(day)" :value="getEnDate(day)" transition="v-fade-transition" reverse-transition="v-fade-transition">
        

          <v-card class="scheduleCard mx-auto" variant="text">

            <v-skeleton-loader
            v-show="loading_lessons"
             class="lessonSkeleton"
             v-for="i in [1, 2, 3, 4, 5]" 
            type="list-item-two-line"
          ></v-skeleton-loader>


          <v-scroll-y-transition v-for="(lesson, i) in lessons" :key="i" hide-on-leave=true> 
            <ScheduleLessonCard v-show="!loading_lessons" v-model="lessons[i]"/>
          </v-scroll-y-transition>
          
          </v-card>

        </v-window-item>
      </v-window>
    </v-window-item>
    </v-window>
    </v-card>

  </v-no-ssr>
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
  gap: 1px;
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

.scheduleCard {
  background-color: #121212;
}

.lessonSkeleton {
  background-color: #121212;
}
</style>