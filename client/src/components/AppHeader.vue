<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const session = useSessionStore()
</script>

<template>
  <header class="topbar">
    <RouterLink :to="{ name: 'Home' }" class="logo">Utpost</RouterLink>

    <nav>
      <RouterLink :to="{ name: 'Guides' }">Guider</RouterLink>
      <RouterLink :to="{ name: 'Tours' }">Turer</RouterLink>

      <template v-if="session.isLoggedIn">
        <RouterLink :to="{ name: 'Profile' }">Min profil</RouterLink>

        <!-- TODO: Flytta utloggningsknappen till profilsidan när den är implementerad. -->
        <button type="button" @click="session.logout()">Logga ut</button>
      </template>

      <RouterLink v-else :to="{ name: 'Login' }">Logga in</RouterLink>
    </nav>
  </header>
</template>

<style scoped></style>
