<script setup>
      let lesson = defineModel();

      let typeOfLesson = lesson.value['isLecture'] ? "Лекция" : "Практика"
      let subjectName  = lesson.value["subjectName"]
      let classroom = lesson.value["classroom"]
      let building = lesson.value['building']
      let teacher = lesson.value['teacher']
      let startAt = lesson.value['startAt']
      let endAt = lesson.value['endAt']

</script>
<template>
    
    <v-card class="mx-5 mt-7 mr-md-20 rounded-xl" variant="tonal">

      <v-card-text>
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center ga-4">
            <div>
              <p class="text-subtitle-1 font-weight-bold">{{startAt}}</p>
              <p class="text-caption font-weight-bold text-disabled">{{endAt}}</p>
            </div>
            <div class="d-flex flex-column">
              <p class="text-h6 font-weight-black">
                {{subjectName}}
              </p>
              <div>
                <p class="text-caption">{{typeOfLesson}} | {{teacher}}</p>
              </div>
            </div>
          </div>
  
          <div> 
          <v-chip>ауд {{classroom}}, к.{{building}}</v-chip>
          </div>
          
        </div>
      </v-card-text>
    </v-card>

  </template>

  <style></style>