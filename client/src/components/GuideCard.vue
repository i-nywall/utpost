<script setup lang="ts">
import { computed } from 'vue'
import DOMPurify from 'dompurify'
import type { Guide } from '@utpost/shared'

// Kortet visar bara de här fälten. Pick gör att både REST-svaret (hela Guide)
// och GraphQL-svaret (bara de fält frågan ber om) passar.
// difficulty är String i GraphQL-schemat men Difficulty i shared – kortet skriver bara ut texten,
// så vilken sträng som helst duger här.
type GuideCardData = Omit<
  Pick<Guide, 'slug' | 'title' | 'region' | 'difficulty' | 'length_km' | 'body_html'>,
  'difficulty'
> & { difficulty: string }

const props = defineProps<{
  guide: GuideCardData
}>()

const excerpt = computed(() => DOMPurify.sanitize(props.guide.body_html.slice(0, 180)))
</script>

<template>
  <article class="card" :style="{ border: '1px solid #ddd', padding: '12px', borderRadius: '4px' }">
    <h3>
      <RouterLink :to="{ name: 'GuideDetail', params: { slug: guide.slug } }">{{
        guide.title
      }}</RouterLink>
    </h3>
    <p className="muted">{{ guide.region }} · {{ guide.difficulty }} · {{ guide.length_km }} km</p>
    <div class="excerpt" v-html="excerpt"></div>
  </article>
</template>
