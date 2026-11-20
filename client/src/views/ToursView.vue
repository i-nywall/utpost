<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useQuery } from '@urql/vue'
import { graphql } from '@/gql'
import { formatKm } from '@/utils/format'

// Bara fälten tabellen visar. REST-svaret /api/tours skickade med alla mätpunkter (logs)
// för varje tur, ca 285 kB - här ber vi inte om dem alls.
const ToursQuery = graphql(`
  query Tours {
    tours {
      id
      title
      distanceM
      user {
        displayName
      }
      guide {
        title
      }
      photos {
        id
      }
    }
  }
`)

const { data, fetching, error } = useQuery({ query: ToursQuery })
</script>

<template>
  <div>
    <h1>Turer</h1>

    <div v-if="error" role="alert">Oops! Ett fel inträffade: {{ error.message }}</div>
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
        <tr v-for="tour in data.tours" :key="tour.id">
          <td>
            <RouterLink :to="{ name: 'TourDetail', params: { id: tour.id } }">
              {{ tour.title }}
            </RouterLink>
          </td>
          <td>{{ tour.user.displayName }}</td>
          <td>{{ tour.guide ? tour.guide.title : '-' }}</td>
          <td>{{ formatKm(tour.distanceM) }} km</td>
          <td>{{ tour.photos.length }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="fetching">Laddar turer...</div>
    <div v-else>Oops! Ett fel inträffade</div>
  </div>
</template>
