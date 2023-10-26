<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()

const inputData = ref({
  username: '',
  password: ''
})

const showPassword = ref(false)
const dialog = ref(false)

const submitLoginForm = async () => {
  await auth.login(inputData.value.username, inputData.value.password)
}

const usernameRules = ref([(v: any) => !!v || 'Username is required'])
const passwordRules = ref([
  (v: any) => !!v || 'Password is required',
  (v: string | any[]) => (v && v.length >= 6) || 'Password must be at least 6 characters long'
])

onMounted(() => {
  dialog.value = true
})
</script>

<template>
  <v-dialog v-model="dialog" width="450" transition="dialog-top-transition">
    <v-card class="pa-9 rounded-xl" id="login-modal-card">
      <p class="font-weight-black mb-6 mt-6">Open Llama</p>

      <v-form @submit.prevent="submitLoginForm">
        <vs-icon icon="mood"></vs-icon>
        <p class="font-weight-light">Please enter your Id/Email</p>

        <v-text-field
          class="login-input-fields"
          clearable
          type="text"
          density="compact"
          placeholder="id or email"
          variant="outlined"
          v-model.trim="inputData.username"
          :rules="usernameRules"
          rounded="lg"
        ></v-text-field>

        <p class="font-weight-light">Please enter your Password</p>

        <v-text-field
          class="login-input-fields"
          v-model.trim="inputData.password"
          :rules="passwordRules"
          variant="outlined"
          :type="showPassword ? 'text' : 'password'"
          @click:append-inner="showPassword = !showPassword"
          density="compact"
          placeholder="password"
          rounded="lg"
        >
          <template v-slot:append-inner>
            <i class="isax isax-eye" v-if="showPassword" @click="showPassword = !showPassword"></i>
            <i class="isax isax-eye-slash" v-else @click="showPassword = !showPassword"></i>
          </template>
        </v-text-field>

        <div class="login-helpers">
          <v-checkbox label="Remember me" color="orange" hide-details></v-checkbox>
          <p class="forgot-password-button">Forgot Password?</p>
        </div>
        
        <v-btn
          color="#FB8430"
          class="text-capitalize mt-6 mb-8 rounded-pill"
          id="login-details-submit-button"
          type="submit"
        >
          continue
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
#login-details-submit-button {
  display: block;
  margin: 0 auto;
  width: 60%;
  height: 50px;
  font-weight: 600;
  font-family: 'Albert Sans', sans-serif;
  color: #fff;
}

.para {
  height: 200vh;
}

.login-input-fields {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  color: #281d15;
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
  color: #4e392b;
}

.login-helpers {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
}

.font-weight-black {
  font-family: 'Dosis', sans-serif;
  text-align: center;
  color: #4e3423;
  font-size: 32px;
}

.forgot-password-button {
  color: #d65a03;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
