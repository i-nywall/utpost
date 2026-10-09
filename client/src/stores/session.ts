import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { post } from '@/lib/api'

type User = Record<string, unknown>

type LoginResponse = { token: string; user: User; error?: never } | { error: string }

export const useSessionStore = defineStore('session', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => token.value !== null)

  try {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  } catch {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    token.value = null
  }

  async function login(email: string, password: string): Promise<boolean> {
    error.value = null

    try {
      const data = await post<LoginResponse>('/auth/login', {
        email,
        password,
      })

      if ('error' in data) {
        error.value = data.error ?? 'Inloggningen misslyckades.'
        return false
      }

      token.value = data.token
      user.value = data.user

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      return true
    } catch {
      error.value = 'Det gick inte att logga in. Försök igen.'
      return false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    error.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, user, error, isLoggedIn, login, logout }
})
