<script setup lang="ts">
import { ref } from 'vue'
import GuideCard from '@/components/GuideCard.vue'
import { useGet } from '@/composables/fetch.js'
import { graphql } from '@/lib/graphql'
import { formatKm } from '@/utils/format'
import type { Guide, Tour } from '@utpost/shared'

const guidesAll = useGet<Guide[]>('/guides')
const guidesRegions = useGet<Guide['region'][]>('/guides/regions')
const toursLatest = useGet<Tour[]>('/tours/latest')

const guidesPopular = ref<Guide[] | null>(null)
const guidesPopularLoading = ref(true)
const guidesPopularError = ref<Error | null>(null)

async function loadPopularGuides() {
  guidesPopularLoading.value = true
  guidesPopularError.value = null

  try {
    const result = await graphql<{ popularGuides: Guide[] }>(`
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

    guidesPopular.value = result.popularGuides
  } catch (error) {
    guidesPopularError.value = error instanceof Error ? error : new Error('Okänt fel')
  } finally {
    guidesPopularLoading.value = false
  }
}

void loadPopularGuides()
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
    <p v-if="guidesPopularLoading">Loading...</p>
    <p v-else-if="guidesPopularError" role="alert">
      Oops! Ett fel inträffade: {{ guidesPopularError.message }}
    </p>
    <div v-else-if="guidesPopular" class="grid">
      <GuideCard v-for="guide in guidesPopular" :key="guide.id" :guide="guide" />
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
