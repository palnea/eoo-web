<template>
  <v-snackbar
    :color="color || 'success'"
    :timeout="timer || 3000"
    :v-model="showSnackbar"
    :show="show"
    bottom
    right
  >
    <v-icon left>{{ icon || 'mdi-check' }}</v-icon>
    {{ message || "Helloo" }}
  </v-snackbar>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const showSnackbar = ref(false);
defineProps(['message', 'color', 'icon', 'timer'])


// eslint-disable-next-line vue/no-export-in-script-setup
// const show = (data) => {
//   message.value = data.message || 'missing "message".';
//   color.value = data.color || 'success';
//   timer.value = data.timer || 3000;
//   icon.value = data.icon || 'mdi-check';
//   showSnackbar.value = true;
// };
</script>
