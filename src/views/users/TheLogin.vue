<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const { userLogin } = useAuthStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const showLoginModal = ref(false)

const login = async () => {
  await userLogin(username.value, password.value)
}

const usernameValidation = ref([(username: any) => !!username || 'Username is required'])
const passwordValidation = ref([
  (password: any) => !!password || 'Password is required',
  (password: string | any[]) =>
    (password && password.length >= 6) || 'Password must be at least 6 characters long'
])

onMounted(() => {
  showLoginModal.value = true
})
</script>

<template>
  <v-dialog v-model="showLoginModal" width="450" transition="dialog-top-transition">
    <v-card class="pa-9 rounded-xl" id="login-modal-card">
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
            <i class="isax isax-eye" v-if="showPassword" @click="showPassword = !showPassword"></i>
            <i class="isax isax-eye-slash" v-else @click="showPassword = !showPassword"></i>
          </template>
        </v-text-field>

        <div class="d-flex flex-row justify-center align-center">
          <v-checkbox :label="$t('Remember me')" color="orange" hide-details></v-checkbox>
          <p class="forgot-password-button">{{ $t('Forgot Password?') }}</p>
        </div>

        <v-btn
          color="#FB8430"
          class="text-capitalize my-6 mx-auto rounded-pill d-flex justify-center py-7 px-15"
          type="submit"
        >
          continue
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.login-input-fields {
  font-family: 'Albert Sans', sans-serif;
  font-size: 16px;
}

#login-modal-card {
  background: radial-gradient(
      83.34% 103.62% at 100% 87.3%,
      rgba(227, 156, 73, 0.09) 0%,
      rgba(255, 209, 89, 0.01) 100%
    ),
    linear-gradient(348deg, rgba(249, 249, 249, 0.91) -4.32%, rgba(251, 251, 251, 0.91) 103.37%);
  box-shadow: -2px 82px 109px -25px rgba(0, 0, 0, 0.1);
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

.forgot-password-button {
  color: var(--primary);
  font-size: 13px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
