<template>
  <div class="product-item">
    <img :src="product.image" :alt="product.title" class="product-image" />
    <div class="product-details">
      <h2 class="product-title">{{ product.title }}</h2>
      <p class="product-price">{{ product.price }}</p>
      <p class="product-category">{{ product.category }}</p>
      <p class="product-description">{{ product.description }}</p>
      <div class="actions">
        <button class="edit-button" @click="goToEditProduct">Edit</button>
        <button class="delete-button" @click="deleteProduct">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { toRefs } from 'vue';
import { useProductStore } from '@/stores/product.store';
import { type Product } from '@/types/product';

// Definir las props
const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const productStore = useProductStore();
const { products, isLoading, error } = toRefs(productStore);

const goToEditProduct = () => {
  router.push({ name: 'EditProduct', params: { id: props.product.id } });
};

const deleteProduct = async () => {
  try {
    console.log('ID del producto a eliminar:', props.product.id); 
    const response = await productStore.deleteProduct(String(props.product.id));
    console.log('Respuesta del servidor:', response);
    router.push({ name: 'home' });
  } catch (e) {
    console.error('Error al eliminar el producto', e);
  }
};
</script>


<style scoped>
.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.product-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.product-details {
  text-align: center;
}

.product-title {
  font-size: 1.5em;
  margin-bottom: 8px;
}

.product-price {
  font-size: 1.2em;
  color: #4caf50;
  margin-bottom: 8px;
}

.product-category {
  font-size: 1em;
  color: #757575;
  margin-bottom: 8px;
}

.product-description {
  font-size: 0.9em;
  color: #616161;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.edit-button,
.delete-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button {
  background-color: #2196f3;
  color: white;
}

.edit-button:hover {
  background-color: #1976d2;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #d32f2f;
}
</style>