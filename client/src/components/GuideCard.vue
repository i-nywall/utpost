<script setup>
const props = defineProps({
    guide: Object,
})
</script>
<template>
    <article class="card" :style="{ border: '1px solid #ddd', padding: '12px', borderRadius: '4px' }">
        <h3><RouterLink :to="{name: 'GuideDetail', params: { slug: guide.slug }}">{{ guide.title }}</RouterLink></h3>
        <p className="muted">{{ guide.region }} · {{ guide.difficulty }} · {{ guide.length_km }} km</p>
        <div class="excerpt" v-html="guide.body_html.slice(0, 180)"></div>
    </article>
</template>
