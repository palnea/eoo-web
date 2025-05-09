<template>
  <img src="../../assets/okyanus-koleji-logo.jpg" alt="logo" :width="computedWidth"/>
</template>

<style scoped>
img {
  display: block;
  margin: 1rem;
  margin-top: 2.5rem;
}

@media (max-width: 600px) {
  img {
    display: block;
    margin: 1rem;
    margin-top: 1rem;
  }
}
</style>
<script setup>
import { computed } from 'vue';

const props = defineProps(['width']);
const computedWidth = computed(() => props.width || 250);
</script>
