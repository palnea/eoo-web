<template>
  <v-app>
    <v-main>
      <router-view/>
      <SnackBar/>
      <AppFooter/>
    </v-main>
  </v-app>
</template>

<script setup>
import SnackBar from "@/components/common/SnackBar.vue";
import AppFooter from "@/components/app/AppFooter.vue";

</script>

<style>
</style>
