<script setup lang="ts">
import { Product } from '@/types/product';
import { defineProps, defineEmits } from 'vue';

// Define los props que recibirá el componente
const props = defineProps<{
  products:Product [];
}>();

const emits = defineEmits(['navigateToDetail']);

const goToDetail = (id: string) => {
  emits('navigateToDetail', id);
};
</script>

<template>
  <v-card class="mb-4">
    <v-card-title class="text-h6">Tus Productos más Vendidos</v-card-title>
    <v-slide-group show-arrows>
      <v-slide-item v-for="(recentProduct, index) in products" :key="index">
        <v-card class="mx-2" max-width="150" @click="goToDetail(String(recentProduct.id))" outlined>
          <v-img :src="recentProduct.imageURL" height="120" alt="Imagen del producto"></v-img>
          <v-card-subtitle class="text-h7 mt-1">
            $ {{ recentProduct.price }}
          </v-card-subtitle>
          <v-card-text class="text-body-2" style="font-size: 0.75rem;">
            {{ recentProduct.name }}
          </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-card>
</template>

<style scoped>
.mx-2 {
  margin-inline: 8px;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
