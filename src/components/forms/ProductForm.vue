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






<!-- <script setup lang="ts">
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
        <option value="Toys">Toys</option>
        <option value="Fashion">Fashion</option>
        <option value="Other">Other</option>
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
</style> -->
