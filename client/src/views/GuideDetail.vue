<script setup>
import { useRoute } from 'vue-router'
import { useFetch } from '@/composables/fetch.js'

const { slug } = useRoute().params
const { data, error } = useFetch(`http://localhost:4000/api/guides/${slug}`)
</script>
<template>
  <p v-if="error">Oops, something went wrong. {{ error.message || error }}</p>
  <article v-else-if="data" class="guide">
    <h1>{{ data.title }}</h1>
    <div v-html="data.body_html"></div>
  </article>
  <p v-else>Loading...</p>
</template>
