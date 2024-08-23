<template>
  <div class="product-item">
    <img :src="product.image" :alt="product.title" class="product-image" />
    <h2>{{ product.title }}</h2>
    <p>{{ product.price }}</p>
    <p>{{ product.category }}</p>
    <p>{{ product.description }}</p>
    <div class="actions">
      <button @click="goToEditProduct">Edit</button>
      <button @click="deleteProduct">Delete</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Product } from '@/types/product';


const props = defineProps<{
  product: Product;
}>();

const router = useRouter();

const goToEditProduct = () => {
  router.push({ name: 'EditProduct', params: { id: props.product.id } });
};

const deleteProduct = () => {
  //ToDo: Implementar la lógica para eliminar un producto
  console.log(`Deleting product with ID: ${props.product.id}`);
};

</script>



<style scoped>
.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.product-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

h2 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:first-child {
  background-color: #007bff;
  color: white;
}

button:first-child:hover {
  background-color: #0056b3;
}

button:nth-child(2) {
  background-color: #ffc107;
  color: black;
}

button:nth-child(2):hover {
  background-color: #e0a800;
}

button:last-child {
  background-color: #dc3545;
  color: white;
}

button:last-child:hover {
  background-color: #c82333;
}
</style>
