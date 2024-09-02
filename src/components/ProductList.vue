<script setup lang="ts">
import { Product } from '@/types/product';
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

// Define los props que el componente recibirá
const props = defineProps<{
  isLoading: boolean;
  isSpinnerLoading: boolean;
  error: string | null;
  products: Array<Product>;
  fetchMoreProducts: () => void;
  goToDetail: (id: string) => void;
}>();

const sentinel = ref(null);

onMounted(() => {
  const { stop } = useIntersectionObserver(sentinel, ([{ isIntersecting }]) => {
    if (isIntersecting && !props.isLoading) {
      props.fetchMoreProducts();
    }
  });

  onBeforeUnmount(() => {
    stop();
  });
});

</script>

<template>
  <v-row>
    <!-- Mensaje de carga o error -->
    <v-col cols="12">
      <v-alert v-if="isLoading" type="info">
        Cargando productos...
      </v-alert>
      <v-alert v-else-if="error" type="error">
        {{ error }}
      </v-alert>
    </v-col>

    <!-- Mensaje cuando no hay productos disponibles -->
    <v-col v-if="products.length === 0" cols="12" class="text-center">
      <v-card class="pa-4" outlined>
        <v-card-title>No hay productos disponibles en esta categoría</v-card-title>
      </v-card>
    </v-col>

    <!-- Lista de productos -->
    <v-col v-else v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
      <v-card @click="goToDetail(String(product.id))" class="product-card" hover>
        <v-img :src="product.imageURL" alt="Imagen del producto" aspect-ratio="1.5" class="product-image"></v-img>
        <v-card-title class="text-h6">{{ product.name }}</v-card-title>
        <v-card-subtitle class="text-body-2 text-bold text-primary">
          ${{ product.price }}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="primary" @click.stop="goToDetail(String(product.id))">
            Ver Detalles
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" ref="sentinel"></v-col>

    <v-col cols="12" class="text-center" v-if="isSpinnerLoading && products.length > 0">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-col>
  </v-row>
</template>


<style scoped>
.product-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  border-bottom: 1px solid #e0e0e0;
}
</style>
