<script setup lang="ts">
import { reactive, computed, defineEmits, watchEffect } from 'vue';
import { type Product } from '@/types/product';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const userId = computed(() => authStore.userId);

const emit = defineEmits(['submit']);
const props = defineProps<{
  product?: Product;
}>();

// Inicializar el formulario con los valores del producto o valores predeterminados
const form = reactive<Product>({
  user: { id: Number(userId.value) || 0 },
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

// Asegurarse de que `userId` esté asignado cuando esté disponible
watchEffect(() => {
  if (userId.value) {
    form.user.id = Number(userId.value);
  }

  if (props.product) {
    Object.assign(form, { ...props.product, userId: Number(userId.value) });
  }
});

const submitForm = () => {
  emit('submit', form);
};
</script>

<template>
  <v-form @submit.prevent="submitForm" class="form-container">
    <v-text-field v-model="form.name" label="Nombre" placeholder="Nombre del producto" outlined dense
      required></v-text-field>

    <v-text-field v-model="form.brand" label="Marca" placeholder="Marca del producto" outlined dense
      required></v-text-field>

    <v-textarea v-model="form.description" label="Descripción" placeholder="Descripción del producto" outlined dense
      required></v-textarea>

    <v-text-field v-model="form.price" label="Precio" placeholder="Precio del producto" type="number" step="0.01"
      outlined dense required></v-text-field>

    <v-select v-model="form.category" :items="['Laptop', 'Headphone', 'Mobile', 'Toys', 'Fashion', 'Other']"
      label="Categoría" placeholder="Seleccionar categoría" outlined dense required></v-select>

    <v-text-field v-model="form.stockQuantity" label="Cantidad en stock" placeholder="Cantidad en stock" type="number"
      outlined dense required></v-text-field>

    <v-text-field v-model="form.releaseDate" label="Fecha de lanzamiento" type="date" outlined dense
      required></v-text-field>

    <v-text-field v-model="form.imageURL" label="URL de la imagen" placeholder="URL de la imagen del producto"
      type="url" outlined dense></v-text-field>

    <v-checkbox v-model="form.productAvailable" label="Producto disponible" dense></v-checkbox>

    <v-btn type="submit" color="primary" class="btn-submit" block>Guardar producto</v-btn>
  </v-form>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 2rem auto;
}

.btn-submit {
  margin-top: 1.5rem;
}
</style>