<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const form = reactive({
  email: '',
  password: '',
})

const router = useRouter()
const session = useSessionStore()

const submit = async () => {
  const success = await session.login(form.email, form.password)

  if (success) {
    await router.push({ name: 'Profile' })
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="login">
    <h1>Logga in</h1>

    <label for="login-email">E-post</label>
    <input
      id="login-email"
      v-model="form.email"
      name="email"
      type="email"
      placeholder="E-post"
      autocomplete="username"
      required
    />

    <label for="login-password">Lösenord</label>
    <input
      id="login-password"
      v-model="form.password"
      name="password"
      type="password"
      placeholder="Lösenord"
      autocomplete="current-password"
      required
    />

    <div class="login-error" aria-live="polite">
      <p v-if="session.error" class="error">
        {{ session.error }}
      </p>
    </div>

    <button type="submit" class="button-blue">Logga in</button>
  </form>
</template>

<style scoped>
.login-error {
  min-height: 3rem;
}

.login-error .error {
  margin: 0;
}
</style>
