<script setup>
import { RouterLink } from 'vue-router'
import { useFetch } from '@/composables/fetch.js'
import { ref } from 'vue'

const { data, error } = useFetch('http://localhost:4000/api/tours')

const formatKm = (meters) => Math.round(meters / 100) / 10
</script>

<template>
  <div>
    <h1>Turer</h1>

    <div v-if="error">Oops! Ett fel inträffade: {{ error.message }}</div>
    <table v-else-if="data" class="tours">
      <thead>
        <tr>
          <th>Tur</th>
          <th>Av</th>
          <th>Guide</th>
          <th>Längd</th>
          <th>Bilder</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in data" :key="t.id">
          <td>
            <RouterLink :to="`/turer/${t.id}`">{{ t.title }}</RouterLink>
          </td>
          <td>{{ t.user?.display_name }}</td>
          <td>{{ t.guide ? t.guide.title : '-' }}</td>
          <td>{{ formatKm(t.distance_m) }} km</td>
          <td>{{ t.photos.length }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>Laddar turer...</div>
  </div>
</template>
