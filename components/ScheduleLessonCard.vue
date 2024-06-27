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
              <p class="font-weight-black subjectName">
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
        font-size: 0.7rem; 
        max-width: 25vw;
    }
   
}
</style>