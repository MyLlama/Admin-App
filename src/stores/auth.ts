import axios from 'axios'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const baseUrl = import.meta.env.VITE_OPEN_EDX_BASE_URL
const url = `${baseUrl}/oauth2/access_token`

export const useAuthStore = defineStore('auth', () => {
  const authToken = useStorage('authToken', '')
  const userId = useStorage('userId', '')
  const tokenExpiry = useStorage('tokenExpirey', 0)

  async function userLogin(username: string, password: string): Promise<void> {
    try {
      const response = await axios.post(url, null, {
        params: {
          username,
          password,
          grant_type: 'password',
          client_id: import.meta.env.VITE_CLIENT_ID
        }
      })

      console.log(response.data)
      authToken.value = response.data.access_token
      userId.value = username
      const expiresIn = +response.data.expires_in * 1000
      tokenExpiry.value = Date.now() + expiresIn
    } catch (error) {
      console.error(error)
    }
  }

  function isAuthenticated() {
    if (!authToken.value || !tokenExpiry.value) {
      return false
    }
    return Date.now() < tokenExpiry.value
  }

  function logout() {
    authToken.value = ''
    userId.value = ''
    tokenExpiry.value = 0
  }

  return {
    userId,
    authToken,
    userLogin,
    isAuthenticated,
    logout
  }
})
