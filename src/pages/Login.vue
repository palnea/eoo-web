<script setup>
import { ref, reactive } from 'vue'
import apiService from "@/services/api.service";
import { errorMessage } from "@/utils/message";
import { consoleError } from "@/utils/logger";
import BackgroundArt from "@/components/common/BackgroundArt.vue";
import AppLogo from "@/components/app/AppLogo.vue";

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
  <BackgroundArt/>
  <v-container class="flex-col-center justify-center" style="width: 500px; height: 80vh">
    <div style="min-width: fit-content; display: flex; flex-direction: column; align-items: center; padding: 16px">
      <AppLogo :width="100"></AppLogo>
      <p class="font-weight-medium" style="text-align: center; margin: 5px 0 15px 0; font-family: Montserrat; font-size: 20px;">Admin</p>
    </div>
    <v-form :model=formState fast-fail @submit="loginAttempt" style="width: 300px">
      <v-text-field v-model="formState.email" label="E-posta"></v-text-field>

      <v-text-field v-model="formState.password" label="Şifre"></v-text-field>

      <v-btn type="submit" color="primary" block class="mt-2 no-uppercase" :loading=loading >Giriş Yap</v-btn>

    </v-form>
  </v-container>
</template>

<style scoped>

</style>
