<template>
           <v-app class='v-app-scoped'>  
      <v-container>
        <v-text-field v-model="teacherInput" label="Фамилия преподавателя" />
        <v-date-input
          readonly="true"
          label="Дата"
          prepend-icon=""
          prepend-inner-icon="$calendar"
          v-model="pickedDate"
        ></v-date-input>
      </v-container>
      <v-container>
        <v-card>
          <v-expansion-panels v-model="pickedTeacher">
            <v-expansion-panel
              v-for="(teacherName, i) in items"
              :key="teacherName"
              :value="teacherName"
            >
              <v-expansion-panel-title>{{teacherName}}</v-expansion-panel-title>
              <v-expansion-panel-text class="wrapper-scoped" v-for="(lesson, i) in lessons" :key="i"> <ScheduleTeacherCard v-model="lessons[i]"></ScheduleTeacherCard> </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script setup>
  
    import { VDateInput } from 'vuetify/labs/VDateInput'
    import { useDate } from 'vuetify'
    import { watch } from 'vue'
    import { ref } from 'vue'
  
    const teacherInput = ref()
    const items = ref()
    const lessons = ref()

    const pickedTeacher = ref('')
    const pickedDate = ref()

    function getEnDate(date) {
        return date.toLocaleDateString("en")
    }

    watch(pickedTeacher, async () => {
      if (teacherInput.value.length > 0 && pickedDate.value != null) {
        fetch(
          'https://dev.bgitu-compass.ru/teacherSearch?searchQuery=' +
            teacherInput.value
        )
          .then(response => response.json())
          .then(data => {
            items.value = data
          })
      }
    })
  
    watch(teacherInput, async () => {
      if (teacherInput.value.length > 0 && pickedDate.value != null) {
        fetch(
          'https://dev.bgitu-compass.ru/teacherSearch?searchQuery=' +
            teacherInput.value
        )
          .then(response => response.json())
          .then(data => {
            items.value = data
          })
      }
    })

    watch(pickedDate, async () => {
      if (teacherInput.value != null && pickedDate.value != null) {
        fetch(
          'https://dev.bgitu-compass.ru/teacherSearch?searchQuery=' +
            teacherInput.value
        )
          .then(response => response.json())
          .then(data => {
            items.value = data
          })
      }
    })

    watch(pickedTeacher, async (newk, oldk) => {

        teacherInput.value = pickedTeacher.value
      if (teacherInput.value.length > 0 && pickedDate.value != null) {


        console.log(new Date(pickedDate.value).toLocaleDateString('en'))
        let day_splitted = getEnDate(new Date(pickedDate.value)).split("/").reverse();
        [day_splitted[1], day_splitted[2]] = [day_splitted[2], day_splitted[1]];

        let pickedDateFormat = "";

        for(let i = 0; i < day_splitted.length; i++) {
            if (day_splitted[i].length == 1) {
                pickedDateFormat += "0" + day_splitted[i]
            } else {
                pickedDateFormat += day_splitted[i]
            }

            if (i != 2) {
                pickedDateFormat += "-"
            }
        }

        fetch(
          'https://dev.bgitu-compass.ru/teacherSearch?teacher=' + pickedTeacher.value + '&dateFrom=' + pickedDateFormat + '&dateTo=' + pickedDateFormat
        )
          .then(response => response.json())
          .then(data => {
            lessons.value = data
          })
      }

      console.log(lessons.value)
    })

  </script>


<style>
.v-app-scoped {
    max-height: 75vh;
}

.wrapper-scoped {
    padding: 0;
}

.v-date-picker-controls {
    display: none;
}

.v-date-picker-month__weekday {
 display: none;
}

.v-expansion-panel-text__wrapper {
    padding: 0px
}

.v-expansion-panel-text {
    padding: 0
}
</style>