<script setup>
      let lesson = defineModel();
      let classroom = lesson.value['classroom']
      let typeOfLesson = lesson.value['isLecture'] ? "Лекция" : "Практика"
      let building = lesson.value['building']

      let startAt = lesson.value['startAt'].split(":")[0] + ":" + lesson.value['startAt'].split(":")[1]
      let endAt = lesson.value['endAt'].split(":")[0] + ":" + lesson.value['endAt'].split(":")[1]


</script>
<template>
    <v-card class="mx-2 mt-2 mr-md-20 rounded-xl" variant="tonal">

      <v-card-text>
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center ga-4">
            <div>
              <p class="font-weight-bold startTime">{{startAt}}</p>
              <p class="font-weight-bold text-disabled endTime">{{endAt}}</p>
            </div>
            <div class="d-flex flex-column">
              <div>
                <p class="subt font-weight-bold">{{typeOfLesson}}</p>
              </div>
            </div>
          </div>
  
          <div> 
          <v-chip ><p class="chip">ауд {{classroom}}, к.{{building}}</p></v-chip>
          </div>
          
        </div>
      </v-card-text>
    </v-card>
  </template>

<style>
.subjectName {
    line-height: 1.5em;
    max-height: 3em;       /* height is 2x line-height, so two lines will display */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    max-width: 20vw;
}

.v-card-text {
  padding: 0.6rem
}

.startTime {
    font-size: 0.8rem;
}

.endTime {
    font-size: 0.7rem;
}

.subt {
    font-size: 0.95rem;
}

.chip {
    font-size: 0.7rem;
}
@media (min-width: 750px) { 
    .subjectName {
        font-size: 1rem; 
    }
   
}

@media (min-width: 409px) { 
    .subjectName {
        font-size: 0.9rem; 
        max-width: 35vw;
    }
   
}

@media (max-width: 408px) { 
    .subjectName {
        font-size: 0.8rem; 
        max-width: 40vw;
    }
   
}
</style>