<style scoped>

</style>

<template>
  <h1>Bientôt, les données de l'acteur id: {{ acteurId }}</h1>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  acteurId: String,
})
const acteurId = ref(props.acteurId)
</script>