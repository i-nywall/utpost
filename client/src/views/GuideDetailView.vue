<script setup lang="ts">
import { computed } from 'vue'
import DOMPurify from 'dompurify'
import { useGet } from '@/composables/fetch.js'
import type { Guide } from '@utpost/shared'

const props = defineProps<{
  slug: string
}>()
const { data, isLoading, error } = useGet<Guide>(`/guides/${props.slug}`)

const safeHtml = computed(() => (data.value ? DOMPurify.sanitize(data.value.body_html) : ''))
</script>
<template>
  <p v-if="isLoading">Laddar...</p>
  <p v-else-if="error" role="alert">Oops! Ett fel inträffade: {{ error.message || error }}</p>
  <article v-else-if="data" class="guide">
    <h1>{{ data.title }}</h1>
    <div v-html="safeHtml"></div>
  </article>
</template>
