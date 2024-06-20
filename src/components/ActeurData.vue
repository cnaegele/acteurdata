<style scoped>
  .coltitre {
    font-weight: bold;
  }
  .colinfoimportant {
    color: red;
  }
  .colinfo {
    font-size: small;
  }
</style>

<template>
  <h1>Bientôt, les données de l'acteur id: {{ acteurId }}</h1>
  <v-container class="bg-surface-variant">
    <v-row v-if="acteurD.bactif == '0'" no-gutters>
      <v-col cols="12" md="12" class="colinfoimportant">Acteur désactive <span v-if="acteurD.datedesactivation !== null"> le {{ acteurD.datedesactivation }}</span></v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="2" class="coltitre">Nom</v-col>
      <v-col cols="12" md="10">{{ acteurD.acteurnom }}</v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="2" class="coltitre">Adresse</v-col>
      <v-col cols="12" md="10"><div v-html="acteurD.acteuradresse"></div></v-col> <!-- v-html pour garder les <br/>-->
    </v-row>
    <v-row v-if="acteurD.acteurcommentaire !== null" no-gutters>
      <v-col cols="12" md="2" class="coltitre">Commentaire</v-col>
      <v-col cols="12" md="10"><div v-html="acteurD.acteurcommentaire"></div></v-col> <!-- v-html pour garder les <br/>-->
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12" class="colinfo">Création le {{ acteurD.datecreation }}. <span v-if="acteurD.datemodification !== null"> Dernière modification le {{ acteurD.datemodification }}</span></v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { getActeurData } from '../axioscalls.js'
const props = defineProps({
  acteurId: String,
})
const acteurId = ref(props.acteurId)
const acteurData = await getActeurData(acteurId.value)
console.log(acteurData)
const acteurD = acteurData[0]
</script>