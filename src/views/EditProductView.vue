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

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product.store';
import ProductForm from '@/components/forms/ProductForm.vue'; // Asegúrate de que la importación sea correcta
import { type Product } from '@/types/product';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const productId = route.params.id as string;

const product = computed(() => productStore.getProductById(productId));

onMounted(() => {
  if (!product.value) {
    productStore.fetchProductById(productId)
      .then(() => {
        if (!product.value) {
          console.error("Producto no encontrado.");
        }
      })
      .catch(error => {
        console.error('Error al cargar el producto:', error);
      });
  }
});

const updateProduct = async (updatedProduct: Partial<Product>) => {
  if (product.value) {
    try {
      await productStore.updateProduct(productId, updatedProduct);
      router.push({ name: 'ProductDetail', params: { id: productId } });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  }
};
</script>

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
