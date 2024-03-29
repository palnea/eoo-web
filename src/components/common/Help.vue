<template>
  <v-col class="flex-col-center">
    <div style="margin-top: 20px;margin-bottom: 10px; height: 1px; width: 100px; background-color: lightgray"></div>
    <v-btn variant="flat" color="gray" class="no-uppercase" size="small" @click="showHelpDialog">Yardım</v-btn>
    <v-dialog v-model="dialogVisible" max-width="400">
      <v-card>
        <v-card-title class="text-h6">İletişime Geçin</v-card-title>
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
