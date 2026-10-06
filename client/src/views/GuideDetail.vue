<script setup lang="ts">
import { useGet } from '@/composables/fetch.js'
import type { Guide } from '@utpost/shared'

const props = defineProps<{
  slug: string
}>()
const { data, isLoading, error } = useGet<Guide>(`/guides/${props.slug}`)
</script>
<template>
  <p v-if="isLoading">Laddar...</p>
  <p v-else-if="error" role="alert">Oops! Ett fel inträffade: {{ error.message || error }}</p>
  <article v-else-if="data" class="guide">
    <h1>{{ data.title }}</h1>
    <div v-html="data.body_html"></div>
  </article>
</template>
