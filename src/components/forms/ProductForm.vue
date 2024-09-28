<script setup lang="ts">
import { reactive, computed, defineEmits, defineProps, watchEffect } from 'vue';
import { type CreateProduct } from '@/types/product';

const emit = defineEmits(['submit']);
const props = defineProps<{
  product?: CreateProduct;
}>();

const form = reactive<CreateProduct>({
  title: '',
  brand: '',
  description: '',
  price: 0,
  categoryId: 0,
  stockQuantity: 0,
  productAvailable: false,
  images: [],
});

const categories = [
  { id: 1, name: 'Clothes' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Furniture' },
  { id: 4, name: 'Shoes' },
  { id: 5, name: 'Miscellaneous' }
];

const addImageUrl = () => {
  form.images.push('');
};

const removeImageUrl = (index: number) => {
  form.images.splice(index, 1);
};

const submitForm = () => {
  emit('submit', form);
};

// Computed property to handle category name based on categoryId
const selectedCategory = computed({
  get: () => {
    const category = categories.find(cat => cat.id === form.categoryId);
    return category ? category.name : '';
  },
  set: (name: string) => {
    const category = categories.find(cat => cat.name === name);
    if (category) {
      form.categoryId = category.id;
    }
  }
});

// Watch for changes in props.product to update form
watchEffect(() => {
  if (props.product) {
    Object.assign(form, props.product);
    if (props.product.category) {
      form.categoryId = props.product.category.id;
    }
  }
});
</script>

<template>
  <v-form @submit.prevent="submitForm" class="form-container">
    <v-container class="d-flex justify-center flex-column">
      <v-text-field v-model="form.title" label="Nombre" placeholder="Nombre del producto" variant="outlined" dense required></v-text-field>

      <v-text-field v-model="form.brand" label="Marca" placeholder="Marca del producto" variant="outlined" dense required></v-text-field>

      <v-textarea v-model="form.description" label="Descripción" placeholder="Descripción del producto" variant="outlined" dense required></v-textarea>

      <v-text-field v-model="form.price" label="Precio" placeholder="Precio del producto" type="number" step="0.01" variant="outlined" dense required></v-text-field>

      <v-select v-model="selectedCategory" :items="categories.map(cat => cat.name)" label="Categoría" placeholder="Seleccionar categoría" variant="outlined" dense required></v-select>

      <v-text-field v-model="form.stockQuantity" label="Cantidad en stock" placeholder="Cantidad en stock" type="number" variant="outlined" dense required></v-text-field>

      <div v-for="(url, index) in form.images" :key="index" class="d-flex align-center">
        <v-text-field v-model="form.images[index]" label="URL de la imagen" placeholder="URL de la imagen del producto" type="url" variant="outlined" dense></v-text-field>
        <v-btn icon @click="removeImageUrl(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
      <v-btn color="#00B0FF" @click="addImageUrl">Agregar URL de imagen</v-btn>

      <v-checkbox v-model="form.productAvailable" label="Producto disponible" dense></v-checkbox>

      <v-btn type="submit" color="#00B0FF" class="btn-submit" block>Guardar producto</v-btn>
    </v-container>
  </v-form>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
}

.btn-submit {
  margin-top: 1.5rem;
}
</style>