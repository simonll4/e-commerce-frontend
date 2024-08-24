<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="title">Título</label>
      <input id="title" v-model="form.title" type="text" placeholder="Título del producto" />
    </div>

    <div class="form-group">
      <label for="price">Precio</label>
      <input id="price" v-model="form.price" type="number" step="0.01" placeholder="Precio del producto" />
    </div>

    <div class="form-group">
      <label for="description">Descripción</label>
      <textarea id="description" v-model="form.description" placeholder="Descripción del producto"></textarea>
    </div>

    <div class="form-group">
      <label for="category">Categoría</label>
      <input id="category" v-model="form.category" type="text" placeholder="Categoría del producto" />
    </div>

    <div class="form-group">
      <label for="image">URL de la imagen</label>
      <input id="image" v-model="form.image" type="text" placeholder="URL de la imagen del producto" />
    </div>

    <button type="submit" class="btn-submit">Guardar cambios</button>
  </form>
</template>

<script setup lang="ts">
import { reactive, toRefs, defineProps, defineEmits } from 'vue';
import { type Product } from '@/types/product';

const props = defineProps<{ product: Partial<Product> }>();
const emit = defineEmits(['submit']);

const form = reactive({ ...props.product });

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
