<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="app">
    <AppHeader />

    <main>
      <RouterView />
    </main>

    <footer>Utpost vue port</footer>
  </div>
</template>

<style scoped></style>
