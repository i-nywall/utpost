<script setup></script>

<template>
  <div class="app">
    <header class="topbar">
      <RouterLink to="/" class="logo">Utpost</RouterLink>
      <nav>
        <RouterLink :to="{ name: 'Guides' }">Guider</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>Utpost vue port</footer>
  </div>
</template>

<style scoped></style>
