<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from './views/HeaderView.vue';
</script>

<template>
  <div class="app">
    <Header />

    <main>
      <RouterView />
    </main>

    <footer>Utpost vue port</footer>
  </div>
</template>

<style scoped></style>