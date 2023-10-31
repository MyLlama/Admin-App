import axios from 'axios'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Router } from 'vue-router'

const baseUrl = import.meta.env.VITE_OPEN_EDX_BASE_URL
const url = `${baseUrl}/oauth2/access_token`

export const useAuthStore = defineStore('auth', () => {
  const authToken = useStorage('authToken', '')
  const userId = useStorage('userId', '')
  const validityDuration = useStorage('validityDuration', 0)
  let timer: NodeJS.Timeout | number | null = null

  const userLogin = async (username: any, password: string, router: Router): Promise<void> => {
    try {
      const response = await axios.post(url, null, {
        params: {
          username,
          password,
          grant_type: 'password',
          client_id: import.meta.env.VITE_CLIENT_ID
        }
      })
      
      authToken.value = response.data.access_token
      userId.value = username
      const expiresIn = +response.data.expires_in * 1000
      validityDuration.value = Date.now() + expiresIn

      timer = setTimeout(() => {
        logout(router)
      }, expiresIn)
    } catch (error) {
      console.error(error)
    }
  }

  const isAuthenticated = () => {
    return !!authToken.value
  }

  const logout = (router: Router) => {
    if (Date.now() > validityDuration.value) {
      alert('Session Expired!')
    }
    authToken.value = ''
    userId.value = ''
    validityDuration.value = 0

    if (timer !== null) {
      clearTimeout(timer)
    }
    router.replace({ name: 'login' })
  }

  return {
    userId,
    authToken,
    userLogin,
    isAuthenticated,
    logout
  }
})
