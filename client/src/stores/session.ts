import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { post } from '@/lib/api'
import type { LoginResponse, ApiError, User } from '@utpost/shared'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const useSessionStore = defineStore('session', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => token.value !== null)

  try {
    const savedUser = localStorage.getItem(USER_KEY)

    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  } catch {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
    token.value = null
  }

  async function login(email: string, password: string): Promise<boolean> {
    error.value = null

    try {
      const data = await post<LoginResponse | ApiError>('/auth/login', {
        email,
        password,
      })

      if ('error' in data) {
        error.value = data.error
        return false
      }

      token.value = data.token
      user.value = data.user

      localStorage.setItem(TOKEN_KEY, data.token)
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))

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

    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return { token, user, error, isLoggedIn, login, logout }
})
