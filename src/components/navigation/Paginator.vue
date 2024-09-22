<script setup lang="ts">
import { ref } from 'vue';

const page = ref(1);
</script>

<template>
  <div class="text-center mt-3 mb-3">
    <v-pagination
      v-model="page"
      :length="4"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
    ></v-pagination>
  </div>
</template>