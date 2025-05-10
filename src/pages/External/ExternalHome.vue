<script setup>

import AppLogo from "@/components/app/AppLogo.vue";
import router from "@/router";
import BackgroundArt from "@/components/common/BackgroundArt.vue";
import Help from "@/components/common/Help.vue";

</script>

<template>
  <BackgroundArt/>
  <v-container style="width: 90%; display: flex; flex-direction: column; align-items: center; margin-top: 10rem">
    <AppLogo/>
    <v-col cols="auto" style="margin-top: 50px">
      <v-btn @click="() => router.push('external-signup')" size="large" variant="elevated" color="blue"
             class="no-uppercase">
        Üyelik Oluştur
      </v-btn>
    </v-col>
    <v-btn @click="() => router.push('redeem-code')" variant="tonal" color="blue" class="no-uppercase mt-6">
      Zaten Üyeyim
    </v-btn>
    <div style="margin-top: 40px;margin-bottom: 10px; height: 1px; width: 100px; background-color: lightgray"></div>
    <v-btn @click="() => router.push('external-signup-digiturk')" color="#5C2C91" class="no-uppercase mt-6">
      Digiturk Kodu
    </v-btn>
<!--    <v-btn @click="() => router.push('external-signup-okyanus')" color="#147BAE" class="no-uppercase mt-6">-->
<!--      Okyanus Kolejleri Kodu-->
<!--    </v-btn>-->
    <Help/>
  </v-container>
</template>

<style scoped>
</style>
