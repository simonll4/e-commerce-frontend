<script setup lang="ts">

import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type Product } from '@/types/product';
import { useProductStore } from '@/stores/product.store';

import ProductForm from '@/components/forms/ProductForm.vue';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const productId = route.params.id as string;

const product = computed(() => productStore.getProductById(productId));


onMounted(async () => {
  if (!product.value) {
    try {
      await productStore.fetchProductById(productId);
      if (!product.value) {
        console.error("Producto no encontrado después de cargar."); // To-Do notificacion
        router.push({ name: 'Home' });
      }

    } catch (error) {
      console.error('Error al cargar el producto:', error); // To-Do notificacion
      router.push({ name: 'Home' });

    }
  }
});

const updateProduct = async (updatedProduct: Product) => {
  if (product.value) {
    try {
      await productStore.updateProduct(productId, updatedProduct);
      router.push({ name: 'ProductDetail', params: { id: productId } });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  } else {
    console.error('No se puede actualizar: Producto no encontrado.');
  }
};

</script>

<template>
  <header>
    <div>
      <NavBar />
    </div>
  </header>

  <div class="edit-product">
    <h1>Editar Producto</h1>
    <div v-if="product">
      <ProductForm :product="product" @submit="updateProduct" />
    </div>
    <div v-else class="loading">
      <p>Cargando producto...</p>
    </div>

  </div>
</template>

<style scoped>
.edit-product {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
