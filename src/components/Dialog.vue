<template>
  <v-fade-transition hide-on-leave>
    <v-card
      v-if="dialog"
      append-icon="$close"
      class="mx-auto"
      elevation="16"
      max-width="500"
      title="Send a receipt"
    >
      <template v-slot:append>
        <v-btn icon="$close" variant="text" @click="closeModal"></v-btn>
      </template>

      <v-divider></v-divider>

      <div class="py-12 text-center">
        <v-icon
          class="mb-6"
          :icon="icon"
          :color="iconColor"
          :size="iconSize || 128"
        ></v-icon>

        <div class="text-h4 font-weight-bold">{{ modalMessage }}</div>
      </div>

      <v-divider></v-divider>

      <div class="pa-4 text-end">
        <v-btn
          class="text-none"
          color="medium-emphasis"
          min-width="92"
          rounded
          variant="outlined"
          @click="closeModal"
        >
          Close
        </v-btn>
      </div>
    </v-card>
  </v-fade-transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps(['dialog', 'modalMessage', 'icon', 'iconColor', 'iconSize']);
const emits = defineEmits(['update:dialog']);

const closeModal = () => {
  emits('update:dialog', false);
};

</script>

<style scoped>
</style>
