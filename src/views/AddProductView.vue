<template>
  <header>
    <div>
      <NavBar />
    </div>
  </header>

  <div class="add-product-view">
    <h1 class="title">Agregar Producto</h1>
    <ProductForm :product="{}" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { useRouter } from 'vue-router';
import ProductForm from '@/components/forms/ProductForm.vue';
import { type Product } from '@/types/product';
import { useProductStore } from '@/stores/product.store';

const productStore = useProductStore();

const router = useRouter();

const handleSubmit = async (product: Product) => {
  try {
    //await addDoc(collection(db, 'products'), product);
    const response = await productStore.addProduct(product);
    router.push({ name: 'home' });
  } catch (error) {
    console.error('Error adding product: ', error);
  }
};
</script>

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