import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isLoggedIn: false,
    authToken: null
  }),
  actions: {
    async login(username: string, password: string) {
      const baseUrl = import.meta.env.VITE_OPEN_EDX_BASE_URL + `/oauth2/access_token`
      try {
        const response = await axios.post(baseUrl, null, {
          params: {
            username,
            password,
            grant_type: 'password',
            client_id: import.meta.env.VITE_CLIENT_ID
          }
        })
        if (response.status === 200) {
          this.isLoggedIn = true
          this.authToken = response.data.access_token
          console.log('Login Successful !!')
        } else {
          console.log('Error in Login !!')
        }
        return response.data
      } catch (error) {
        console.error(error)
        return {}
      }
    },
    logout() {
      this.isLoggedIn = false
      this.authToken = null
    }
  }
})
