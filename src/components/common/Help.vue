<template>
  <v-col class="flex-col-center mt-10">
    <v-btn icon elevation="1" color="blue" class="no-uppercase" size="large" @click="showHelpDialog"
    style="position: absolute; top: 1em;right: 1em">
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>
    <v-dialog v-model="dialogVisible" max-width="400">
      <v-card>
        <v-card-title class="text-h6" style="background-color: white;color: #2096F3">İletişime Geçin</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-icon color="primary" size="24">mdi-email-outline</v-icon>
                <a class="ml-2" href="mailto:info@funlygames.com">info@funlygames.com</a>
              </v-col>
              <v-col cols="12">
                <v-icon color="primary" size="24">mdi-phone-outline</v-icon>
                <a class="ml-2" href="tel:+905459325560">+90 545 932 55 60</a>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Kapat</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script setup>
import { ref } from 'vue';

const dialogVisible = ref(false);

const showHelpDialog = () => {
  dialogVisible.value = true;
}

const closeDialog = () => {
  dialogVisible.value = false;
}
</script>

<style scoped>
.v-dialog {
  font-family: 'Roboto', sans-serif;
}

.v-card-title {
  background-color: #5c6bc0;
  color: #ffffff;
}

</style>
