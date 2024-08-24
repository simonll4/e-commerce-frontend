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
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product.store';
import ProductForm from '@/components/forms/ProductForm.vue';
import { type Product } from '@/types/product';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const productId = route.params.id;

const product = computed(() => productStore.getProductById(productId.toString()));

const updateProduct = (updatedProduct: Partial<Product>) => {
  if (product.value) {
    const response = productStore.updateProduct({ ...product.value, ...updatedProduct });
    console.log('Response:', response);

    // Usa router.push en lugar de route.push
    router.push({ name: 'ProductDetail', params: { id: productId } });
  }
};
</script>

<!-- <script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product.store';
import ProductForm from '@/components/ProductForm.vue';
import { type Product } from '@/types/product';

const route = useRoute();
const productStore = useProductStore();
const productId = Number(route.params.id);

const product = computed(() => productStore.getProductById(productId));

const updateProduct = (updatedProduct: Partial<Product>) => {
  if (product.value) {
    console.log('Updating product', updatedProduct);
    const responde = productStore.updateProduct({ ...product.value, ...updatedProduct });
    console.log('Response:', responde);
    route.push({ name: 'ProductDetail', params: { id: productId } });
  }
};


</script> -->

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
