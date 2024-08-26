<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="name">Nombre</label>
      <input id="name" v-model="form.name" type="text" placeholder="Nombre del producto" />
    </div>

    <div class="form-group">
      <label for="brand">Marca</label>
      <input id="brand" v-model="form.brand" type="text" placeholder="Marca del producto" />
    </div>

    <div class="form-group">
      <label for="description">Descripción</label>
      <textarea id="description" v-model="form.description" placeholder="Descripción del producto"></textarea>
    </div>

    <div class="form-group">
      <label for="price">Precio</label>
      <input id="price" v-model="form.price" type="number" step="0.01" placeholder="Precio del producto" />
    </div>

    <div class="form-group">
      <label for="category">Categoría</label>
      <select id="category" v-model="form.category">
        <option value="">Seleccionar categoría</option>
        <option value="Laptop">Laptop</option>
        <option value="Headphone">Headphone</option>
        <option value="Mobile">Mobile</option>
        <option value="Electronics">Electronics</option>
        <option value="Toys">Toys</option>
        <option value="Fashion">Fashion</option>
      </select>
    </div>

    <div class="form-group">
      <label for="stockQuantity">Cantidad en stock</label>
      <input id="stockQuantity" v-model="form.stockQuantity" type="number" placeholder="Cantidad en stock" />
    </div>

    <div class="form-group">
      <label for="releaseDate">Fecha de lanzamiento</label>
      <input id="releaseDate" v-model="form.releaseDate" type="date" />
    </div>

    <div class="form-group">
      <label for="imageURL">URL de la imagen</label>
      <input id="imageURL" v-model="form.imageURL" type="url" placeholder="URL de la imagen del producto" />
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" v-model="form.productAvailable" />
        Producto disponible
      </label>
    </div>

    <button type="submit" class="btn-submit">Guardar producto</button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits, watchEffect } from 'vue';
import { type Product } from '@/types/product';

const emit = defineEmits(['submit']);
const props = defineProps<{
  product?: Product;
}>();

const form = reactive<Partial<Product>>({
  name: '',
  brand: '',
  description: '',
  price: '',
  category: '',
  stockQuantity: '',
  releaseDate: '',
  productAvailable: false,
  imageURL: '',
});

// Inicializar el formulario con los datos del producto si se pasa como prop
watchEffect(() => {
  if (props.product) {
    Object.assign(form, props.product);
  }
});

const submitForm = () => {
  emit('submit', form);
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
}

.btn-submit {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.btn-submit:hover {
  background-color: #2980b9;
}
</style>
