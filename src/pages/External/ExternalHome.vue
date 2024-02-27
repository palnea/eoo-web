<script setup>

import AppLogo from "@/components/AppLogo.vue";
import router from "@/router";
</script>

<template>
  <div class="background-container"/>
  <v-container style="width: 500px; display: flex; flex-direction: column; align-items: center">
    <AppLogo/>
    <v-col cols="auto">
      <v-btn @click="() => router.push('external-signup')" size="large" variant="elevated" color="blue" class="no-uppercase">Üyelik Oluştur</v-btn>
    </v-col>
    <div style="margin-top: 20px;margin-bottom: 20px; height: 1px; width: 300px; background-color: lightgray"></div>
    <v-btn @click="() => router.push('redeem-code')" variant="tonal" color="blue" class="no-uppercase">Zaten Üyeyim</v-btn>
  </v-container>
</template>

<style scoped>
.background-container {
  height: 100vh;
  width: 1920px;
  background-image: url('../../assets/cute-doodles.jpg');
  background-size: auto 100%;
  background-position: center;
  position: absolute;
  opacity: 0.06;
  background-repeat: repeat-x;
  aspect-ratio: initial;
}
</style>
