<script setup lang="ts">
import GuideCard from '@/components/GuideCard.vue'
import { useGet } from '@/composables/fetch.js'
import { formatKm } from '@/utils/format'
import type { Guide, Tour } from '@utpost/shared'

const guidesAll = useGet<Guide[]>('/guides')
const guidesPopular = useGet<Guide[]>('/guides/popular')
const guidesRegions = useGet<Guide['region'][]>('/guides/regions')
const toursLatest = useGet<Tour[]>('/tours/latest')
</script>
<template>
  <div class="home">
    <section class="hero">
      <h1>Hitta din nästa tur</h1>
      <p>
        {{ guidesAll.data.value?.length ?? 0 }} guider i {{ guidesRegions.data.value?.length ?? 0 }} landskap.
      </p>
    </section>

    <h2>Populärast just nu</h2>
    <div class="grid">
      <GuideCard v-for="guide in guidesPopular.data.value" :key="guide.id" :guide="guide" />
    </div>

    <h2>Senaste turerna</h2>
    <ul class="list">
      <li v-for="tour in toursLatest.data.value" :key="tour.id">
        <RouterLink :to="{ name: 'TourDetail', params: { id: tour.id } }">{{
          tour.title
        }}</RouterLink>
        <!-- Added whitespace explicitly, can't get it to look like in react and this was better than no whitespace -->
        &nbsp;
        <span class="muted">{{ formatKm(tour.distance_m) }} km</span>
      </li>
    </ul>

    <h2>Alla guider</h2>
    <div class="grid">
      <GuideCard v-for="guide in guidesAll.data.value" :key="guide.id" :guide="guide" />
    </div>
  </div>
</template>
