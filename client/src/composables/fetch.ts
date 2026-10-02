import { get } from '@/lib/api'
import { ref, watchEffect } from 'vue'

export function useGet<T>(path: string) {
  const isLoading = ref(false)
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)

  const fetchData = () => {
    // reset state before fetching..
    isLoading.value = true
    data.value = null
    error.value = null

    get<T>(path)
      .then((value) => (data.value = value))
      .catch((err) => (error.value = err))
      .finally(() => (isLoading.value = false))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error, isLoading }
}
