<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'

const session = useSessionStore()
const router = useRouter()

const logout = async () => {
  session.logout()
  await router.push('/')
}
</script>

<template>
  <header class="topbar">
    <RouterLink to="/" class="logo">Utpost</RouterLink>

    <nav>
      <RouterLink :to="{ name: 'Guides' }">Guider</RouterLink>
      <RouterLink :to="{ name: 'Tours' }">Turer</RouterLink>

      <template v-if="session.isLoggedIn">
        <RouterLink to="/profil">Min profil</RouterLink>

        <button type="button" @click="logout">Logga ut</button>
      </template>

      <RouterLink v-else to="/login">Logga in</RouterLink>
    </nav>
  </header>
</template>

<style scoped></style>
