<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useGet } from '@/composables/fetch.js'
import type { Guide } from '@utpost/shared'

const { slug } = useRoute().params
const { data, isLoading, error } = useGet<Guide>(`/guides/${slug}`)
</script>
<template>
  <p v-if="error">Oops! Ett fel inträffade: {{ error.message || error }}</p>
  <article v-else-if="data" class="guide">
    <h1>{{ data.title }}</h1>
    <div v-html="data.body_html"></div>
  </article>
  <p v-else-if="isLoading">Laddar...</p>
  <p v-else>Oops! Ett fel inträffade.</p>
</template>
