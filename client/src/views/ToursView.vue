<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useGet } from '@/composables/fetch.js'
import type { TourWithRelations } from '@utpost/shared'

const { data, isLoading, error } = useGet<TourWithRelations[]>('/tours')

const formatKm = (meters: number) => Math.round(meters / 100) / 10
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
        <tr v-for="tour in data" :key="tour.id">
          <td>
            <RouterLink :to="{ name: 'TourDetail', params: { id: tour.id } }">
              {{ tour.title }}
            </RouterLink>
          </td>
          <td>{{ tour.user?.display_name }}</td>
          <td>{{ tour.guide ? tour.guide.title : '-' }}</td>
          <td>{{ formatKm(tour.distance_m) }} km</td>
          <td>{{ tour.photos.length }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="isLoading">Laddar turer...</div>
    <div v-else>Oops! Ett fel inträffade</div>
  </div>
</template>
