<script setup>
import Drawer from "@/layouts/Drawer.vue";
import { useAuthStore } from "@/store/authStore";
import { consoleWarning } from "@/utils/logger";
import { onMounted } from "vue";

const authStore = useAuthStore();

const fetchInitialData = async () => {
  try {
    await authStore.fetchUser()
  } catch (err) {
    consoleWarning("Failed to fetch user.")
  } finally {
    // loading.value = false
  }
}
onMounted(fetchInitialData)
</script>

<template>
  <Drawer>
    <router-view></router-view>
  </Drawer>
</template>

<style scoped>

</style>
