<script setup>
import { ref, reactive } from 'vue'
import apiService from "@/services/api.service";
import { errorMessage } from "@/utils/message";
import { consoleError } from "@/utils/logger";

const loading = ref(false);
const formState = reactive({
  email: '',
  password: ''
})

const loginAttempt = async (payload) => {
  try {
    const response = await apiService.login(payload)
    const access = response.data.response_body

    return access
  } catch (err) {
    consoleError(err)

    errorMessage('Bilgiler hatalı.')
  }
}
</script>

<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-form :model=formState fast-fail @submit="loginAttempt">
      <v-text-field v-model="formState.email" label="E-posta"></v-text-field>

      <v-text-field v-model="formState.password" label="Şifre"></v-text-field>

      <v-btn type="submit" color="primary" block class="mt-2" :loading=loading>Giriş Yap</v-btn>

    </v-form>
  </div>
</template>

<style scoped>

</style>
