<script setup>
import { ref, computed } from 'vue'
import GuideCard from '@/components/GuideCard.vue'
import { useFetch } from '@/composables/fetch.js'

const searchTerm = ref('')
const { data, error } = useFetch('http://localhost:4000/api/guides')

// Searching is done clientside in this excersize
// TODO: do searching serverside
const filteredData = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  if (!data.value) return []
  return data.value.filter(guide =>
    guide.title.toLowerCase().includes(lowerCaseSearchTerm) ||
    guide.region.toLowerCase().includes(lowerCaseSearchTerm)
  )
})
</script>
<template>
  <div>
    <h1>Guider</h1>
    <div class="searchrow">
        <input type="text" v-model="searchTerm" placeholder="Sök på namn eller landskap" />
    </div>

    <div v-if="error">Oops! Ett fel inträffade: {{error.message}}</div>
    <div v-else-if="data">
        <p>Resultat: {{ filteredData.length }} av {{ data?.length }}</p>
        <p v-if="filteredData.length === 0">Inga resultat hittades</p>
        <div class="grid">
            <GuideCard v-for="guide in filteredData" :key="guide.id" :guide="guide" />
        </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
