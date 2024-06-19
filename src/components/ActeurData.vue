<style scoped>

</style>

<template>
  <h1>Bientôt, les données de l'acteur id: {{ acteurId }}</h1>
  <div>{{ acteurData[0].acteurnom }}</div>
  <div>{{ acteurData[0].acteuradresse }}</div>
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
</script>