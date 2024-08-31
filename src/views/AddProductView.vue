<script setup lang="ts">
import { useRouter } from 'vue-router';
import ProductForm from '@/components/forms/ProductForm.vue';
import { useProductStore } from '@/stores/product.store';
import { type Product } from '@/types/product';

const router = useRouter();
const productStore = useProductStore();


const handleSubmit = async (product: Product) => {
  try {
    await productStore.addProduct(product as Product);
    router.push({ name: 'Home' });
  } catch (error) {
    console.error('Error al agregar el producto: ', error);
  }
};
</script>


<template>
  <div class="add-product-view">
    <h1 class="title">Agregar Producto</h1>
    <ProductForm @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.add-product-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}
</style>
