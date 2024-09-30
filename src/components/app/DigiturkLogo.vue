<template>
  <img src="../../assets/digiturk-logo.jpg" alt="logo" :width="computedWidth"/>
</template>

<style scoped>
img {
  display: block;
  margin: 1rem;
}
</style>
<script setup>
import { computed } from 'vue';

const props = defineProps(['width']);
const computedWidth = computed(() => props.width || 250);
</script>
