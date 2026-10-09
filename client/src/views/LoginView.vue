<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'

const email = ref('')
const password = ref('')
const router = useRouter()
const session = useSessionStore()

const submit = async () => {
  const success = await session.login(email.value, password.value)

  if (success) {
    await router.push('/profil')
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="login">
    <h1>Logga in</h1>

    <input v-model="email" type="email" placeholder="E-post" autocomplete="username" required />

    <input
      v-model="password"
      type="password"
      placeholder="Lösenord"
      autocomplete="current-password"
      required
    />

    <p v-if="session.error" class="error">
      {{ session.error }}
    </p>

    <button type="submit" class="button-blue">Logga in</button>
  </form>
</template>
