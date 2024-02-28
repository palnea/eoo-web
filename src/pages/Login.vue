<script setup>
import { ref, reactive } from 'vue'
import apiService from "@/services/api.service";
import { errorMessage } from "@/utils/message";
import { consoleError } from "@/utils/logger";
import BackgroundArt from "@/components/common/BackgroundArt.vue";
import AppLogo from "@/components/app/AppLogo.vue";
import { useAuthStore } from '@/store/authStore'
import router from "@/router";

const authStore = useAuthStore()
const loading = ref(false);
const formState = reactive({
  email: '',
  password: ''
})

const loginAttempt = async () => {
  try {
    const payload = {
      email: formState.email,
      password: formState.password
    };
    const response = await apiService.login(payload)
    const responseBody = response.data.response_body.user.role
    if (responseBody === 'admin') {
      authStore.login(responseBody)
      await router.push('dashboard')
    }
  } catch (err) {
    consoleError(err)
    errorMessage('Bilgiler hatalı.')
  }
}
</script>

<template>
  <BackgroundArt/>
  <v-container class="flex-col-center justify-center" style="width: 90%; height: 80vh">
    <div style="min-width: fit-content; display: flex; flex-direction: column; align-items: center; padding: 16px">
      <AppLogo :width="100"></AppLogo>
      <p class="font-weight-medium"
         style="text-align: center; margin: 5px 0 15px 0; font-family: Montserrat; font-size: 20px;">Admin</p>
    </div>
    <v-form :model=formState fast-fail @submit.prevent="loginAttempt" style="width: 300px">
      <v-text-field v-model="formState.email" label="E-posta"></v-text-field>

      <v-text-field v-model="formState.password" type="password" label="Şifre"></v-text-field>

      <v-btn type="submit" color="primary" block class="mt-2 no-uppercase" :loading=loading>Giriş Yap</v-btn>

    </v-form>
  </v-container>
</template>

<style scoped>

</style>
