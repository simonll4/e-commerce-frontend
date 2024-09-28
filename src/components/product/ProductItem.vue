<script setup lang="ts">
import { defineProps } from 'vue';
import type { Product } from '@/types/product';
import router from '@/router';


const props = defineProps<{
  product: Product;
}>();

function goToDetails() {
  router.push({ name: 'ProductDetail', params: { id: props.product.id } });
}
</script>

<template>
  <v-card max-width="344" outlined>
    <!-- <v-img v-if="product.images && product.images.length > 0" :src="product.images[0]" height="200"></v-img> -->
    <v-img v-if="product.images && product.images.length > 0"
      :src="product.images[0] ? product.images[0] : 'https://placehold.co/600x400'" height="200">
    </v-img>
    <v-card-subtitle>{{ product.title }}</v-card-subtitle>
    <v-card-title class="text-h6">
      {{ product.description }}
    </v-card-title>
    <v-card-text class="text-h5 blue--text text--darken-2 mb-0">
      $ {{ product.price }}
    </v-card-text>
    <v-card-actions>
      <v-btn class="bg-light-blue-accent-3" @click="goToDetails">
        Ver más
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-card {
  border-radius: 15px;
  margin-left: .5rem;
}

.v-card-title {
  font-weight: bold;
}

.v-card-text {
  margin-bottom: 16px;
}

.v-btn {
  width: 90%;
  margin: auto;
  margin-bottom: 1rem;
  margin-top: 0;
  color: white;
  font-weight: bold;
}
</style>