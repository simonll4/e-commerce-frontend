<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      description: '',
      price: '',
      imageUrl: ''
    })
  }
});

function addToCart() {
  console.log(`${props.product.name} added to cart`);
}
</script>

<template>
  <v-card max-width="344" outlined>
    <v-img :src="product.imageUrl" height="200"></v-img>

    <v-card-subtitle>{{ product.name }}</v-card-subtitle>

    <v-card-title class="text-h6">
      {{ product.description }}
    </v-card-title>

    <v-card-text class="text-h5 blue--text text--darken-2 mb-0">
      {{ product.price }}
    </v-card-text>

    <v-card-actions>
      <v-btn class="bg-light-blue-accent-3" @click="addToCart">
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
.v-btn{
  width: 90%;
  margin: auto;
  margin-bottom: 1rem;
  margin-top: 0;
  color: white;
  font-weight: bold;
}
</style>