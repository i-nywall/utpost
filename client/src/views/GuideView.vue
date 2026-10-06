<script setup lang="ts">
import { ref, computed } from 'vue'
import GuideCard from '@/components/GuideCard.vue'
import { useGet } from '@/composables/fetch.js'
import type { Guide } from '@utpost/shared'

const searchTerm = ref('')
const { data, isLoading, error } = useGet<Guide[]>('/guides')

// Searching is done clientside in this excersize
// TODO: do searching serverside
const filteredData = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  if (!data.value) return []
  return data.value.filter(
    (guide) =>
      guide.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      guide.region.toLowerCase().includes(lowerCaseSearchTerm),
  )
})
</script>
<template>
  <div>
    <h1>Guider</h1>
    <div class="searchrow">
      <label for="search">Sök: </label>
      <input
        type="text"
        id="search"
        v-model="searchTerm"
        placeholder="Sök på namn eller landskap"
      />
    </div>

    <div v-if="error">Oops! Ett fel inträffade: {{ error.message }}</div>
    <div v-else-if="data">
      <p>Resultat: {{ filteredData.length }} av {{ data?.length }}</p>
      <p v-if="filteredData.length === 0">Inga resultat hittades</p>
      <div class="grid">
        <GuideCard v-for="guide in filteredData" :key="guide.id" :guide="guide" />
      </div>
    </div>
    <div v-else-if="isLoading">Laddar...</div>
    <div v-else>Oops! Ett fel inträffade.</div>
  </div>
</template>
