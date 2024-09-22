<script setup lang="ts">
import { ref } from 'vue';

const icons = ref([
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]);
</script>

<template>
  <v-footer class="container-fluid d-flex flex-column mt-1 w-100 pa-0" >
    <div class="bg-light-blue-accent-3 d-flex w-100 align-center px-4">
      <strong>Get connected with us on social networks!</strong>
      <v-spacer></v-spacer>
      <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-5" size="small" variant="plain"></v-btn>
    </div>
    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>Mi-Tienda.com</strong>
    </div>
  </v-footer>
</template>