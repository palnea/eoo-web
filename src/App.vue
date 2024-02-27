<template>
  <v-app>
    <v-main>
      <router-view/>
      <SnackBar/>
      <v-footer app>
        <v-row>
          <v-col>
            <v-col class="text-center mt-4 flex-row-center justify-center" cols="12">
              <v-icon class="mr-2">mdi-copyright</v-icon>
              {{ new Date().getFullYear() }} &nbsp; {{ "|" }} &nbsp;Funly Family
            </v-col>
          </v-col>
        </v-row>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script setup>
import { consoleWarning } from "@/utils/logger";
import { onMounted } from "vue";
import { useAuthStore } from "@/store/authStore";
import SnackBar from "@/components/common/SnackBar.vue";

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
