<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { userLogin, isAuthenticated } = useAuthStore()

let showLoginModal = false
let username = ref('')
let password = ref('')
const showPassword = ref(false)
const showSnackbar = ref(false)

const login = async () => {
  if (username.value && password.value) {
    await userLogin(username.value, password.value, router)
    const isAuthenticate = isAuthenticated()
    if (isAuthenticate) {
      router.replace({ name: 'home' })
    } else {
      console.error('Authentication Failed!')
      showSnackbar.value = true
    }
  }
}

const usernameValidation = [(username: any) => !!username || 'Username is required']
const passwordValidation = [(password: any) => !!password || 'Password is required']

onMounted(() => {
  showLoginModal = true
})
</script>

<template>
  <v-dialog v-model="showLoginModal" width="450" transition="dialog-top-transition" persistent>
    <v-card class="pa-9 rounded-xl" id="login-modal-card elevation-1">
      <p class="font-weight-black mb-13 mt-6 text-center">{{ $t('Open Llama') }}</p>

      <v-form @submit.prevent="login">
        <p class="font-weight-light">{{ $t('Enter your Username') }}</p>
        <v-text-field
          class="login-input-fields"
          type="text"
          density="compact"
          :placeholder="$t('Enter Username')"
          variant="outlined"
          v-model.trim="username"
          :rules="usernameValidation"
          rounded="lg"
        ></v-text-field>

        <p class="font-weight-light">{{ $t('Enter your Password') }}</p>
        <v-text-field
          class="login-input-fields"
          v-model.trim="password"
          :rules="passwordValidation"
          variant="outlined"
          :type="showPassword ? 'text' : 'password'"
          density="compact"
          :placeholder="$t('Enter Password')"
          rounded="lg"
        >
          <template v-slot:append-inner>
            <i
              class="isax"
              :class="showPassword ? 'isax-eye' : 'isax-eye-slash'"
              @click="showPassword = !showPassword"
            ></i>
          </template>
        </v-text-field>

        <div class="d-flex flex-row justify-center align-center">
          <v-checkbox :label="$t('Remember me')" color="orange" hide-details></v-checkbox>
          <p class="forgot-password-button text-body-2">{{ $t('Forgot Password?') }}</p>
        </div>

        <v-btn
          class="text-capitalize my-6 mx-auto rounded-pill d-flex justify-center py-7 px-15 text-white"
          id="login-details-submit-button"
          type="submit"
        >
          Login
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>

  <div class="text-center">
    <v-snackbar color="var(--primary)" v-model="showSnackbar">
      Invalid Credentials
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="showSnackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped>
.login-input-fields {
  font-family: 'Albert Sans', sans-serif;
}

#login-modal-card {
  background: radial-gradient(
      83.34% 103.62% at 100% 87.3%,
      rgba(227, 156, 73, 0.09) 0%,
      rgba(255, 209, 89, 0.01) 100%
    ),
    linear-gradient(348deg, rgba(249, 249, 249, 0.91) -4.32%, rgba(251, 251, 251, 0.91) 103.37%);
  backdrop-filter: blur(19px);
}

.font-weight-light {
  font-family: 'Albert Sans', sans-serif;
  color: var(--username-password-lable);
}

.font-weight-black {
  font-family: 'Dosis', sans-serif;
  color: var(--login-heading);
  font-size: 32px;
}

#login-details-submit-button {
  background-color: var(--login-submit-button);
}

.forgot-password-button {
  color: var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
