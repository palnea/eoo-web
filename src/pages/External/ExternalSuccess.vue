<script setup>
import { defineProps } from 'vue';

defineProps(['title', 'caption']);
</script>

<template>
  <div class="flex-col-center">
    <div class="py-12 text-center flex-col-center" style="margin: 0 20px; max-width: 80vw">
      <v-icon
        class="mb-6"
        color="success"
        icon="mdi-check-circle-outline"
        size="64"
      ></v-icon>

      <div class="text-h5 font-weight-bold custom-font">{{ title }}</div>
      <v-divider style="width: 300px; margin: 20px auto"></v-divider>
      <div class="text-body-1 custom-font " style="margin-bottom: 20px; max-width: 600px">{{
          caption
        }}
      </div>
      <a href='https://onelink.to/jp4qj8' target='_blank' class="custom-font font-weight-medium" style="margin-bottom: 20px">Funly
        Family'yi Telefonuna İndir</a>
      <img src="../../assets/onelink-qr.jpeg" width="250">
    </div>
  </div>
</template>

<style scoped>

</style>
