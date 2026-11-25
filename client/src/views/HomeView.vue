<script setup lang="ts">
import { useQuery } from '@urql/vue'
import GuideCard from '@/components/GuideCard.vue'
import { useGet } from '@/composables/fetch.js'
import { graphql } from '@/gql'
import { formatKm } from '@/utils/format'
import type { Guide, Tour } from '@utpost/shared'

const guidesAll = useGet<Guide[]>('/guides')
const guidesRegions = useGet<Guide['region'][]>('/guides/regions')
const toursLatest = useGet<Tour[]>('/tours/latest')

// Frågan skrivs med graphql() från codegen – typen för svaret genereras ur schemat,
// ingen handskriven typ som kan glida isär från frågan.
const PopularGuidesQuery = graphql(`
  query PopularGuides {
    popularGuides(limit: 6) {
      id
      slug
      title
      region
      difficulty
      length_km: lengthKm
      body_html: bodyHtml
      hero_image: heroImage
      published
      updated_at: updatedAt
    }
  }
`)

const {
  data: popularData,
  fetching: popularFetching,
  error: popularError,
} = useQuery({ query: PopularGuidesQuery })
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1>Hitta din nästa tur</h1>
      <p>
        {{ guidesAll.data.value?.length ?? 0 }} guider i
        {{ guidesRegions.data.value?.length ?? 0 }} landskap.
      </p>
    </section>

    <h2>Populärast just nu</h2>
    <p v-if="popularFetching">Loading...</p>
    <p v-else-if="popularError" role="alert">
      Oops! Ett fel inträffade: {{ popularError.message }}
    </p>
    <div v-else-if="popularData" class="grid">
      <GuideCard v-for="guide in popularData.popularGuides" :key="guide.id" :guide="guide" />
    </div>

    <h2>Senaste turerna</h2>
    <p v-if="toursLatest.isLoading.value">Loading...</p>
    <p v-else-if="toursLatest.error.value" role="alert">
      Oops! Ett fel inträffade: {{ toursLatest.error.value.message }}
    </p>
    <ul v-else-if="toursLatest.data.value" class="list">
      <li v-for="tour in toursLatest.data.value" :key="tour.id">
        <RouterLink :to="{ name: 'TourDetail', params: { id: tour.id } }">
          {{ tour.title }}
        </RouterLink>
        <!-- Added whitespace explicitly, can't get it to look like in react and this was better than no whitespace -->
        &nbsp;
        <span class="muted">{{ formatKm(tour.distance_m) }} km</span>
      </li>
    </ul>

    <h2>Alla guider</h2>
    <p v-if="guidesAll.isLoading.value">Loading...</p>
    <p v-else-if="guidesAll.error.value" role="alert">
      Oops! Ett fel inträffade: {{ guidesAll.error.value.message }}
    </p>
    <div v-else-if="guidesAll.data.value" class="grid">
      <GuideCard v-for="guide in guidesAll.data.value" :key="guide.id" :guide="guide" />
    </div>
  </div>
</template>
