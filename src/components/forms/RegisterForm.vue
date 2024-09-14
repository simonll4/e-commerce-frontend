<script setup lang="ts">
import { computed, reactive } from 'vue'; // Import the reactive function from the vue package
import { useAuthStore } from '@/stores/auth.store';
import { RegisterRequest } from '@/types/auth';

const emit = defineEmits(['registerSuccess']);

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar: ''
});


const authStore = useAuthStore();
const { isLoading, error, isAuthenticated} = authStore;

const passwordsDoNotMatch = computed(() => form.password !== form.confirmPassword);


const register = async () => {
  if (passwordsDoNotMatch.value) return;

  const registerRequest: RegisterRequest = {
    name: form.name,
    email: form.email,
    password: form.password,
    avatar: form.avatar,
  };

  try {
    await authStore.register(registerRequest);
    if (isAuthenticated) {
      emit('registerSuccess');
    }
  } catch (e) {
    console.error('Error during registration:', e);
  }
};
</script>


<template>
  <form @submit.prevent="register">
    <!-- Campo Nombre -->
    <div class="form-group">
      <label for="name">Nombre</label>
      <input type="text" id="name" v-model="form.name" required />
    </div>

    <!-- Campo Correo Electrónico -->
    <div class="form-group">
      <label for="email">Correo Electrónico</label>
      <input type="email" id="email" v-model="form.email" required />
    </div>

    <!-- Campo Contraseña -->
    <div class="form-group">
      <label for="password">Contraseña</label>
      <input type="password" id="password" v-model="form.password" required />
    </div>

    <!-- Campo Confirmar Contraseña -->
    <div class="form-group">
      <label for="confirmPassword">Confirmar Contraseña</label>
      <input type="password" id="confirmPassword" v-model="form.confirmPassword" required />
    </div>

    <!-- Campo Avatar (URL de Imagen) -->
    <div class="form-group">
      <label for="avatar">Avatar (URL de imagen)</label>
      <input type="url" id="avatar" v-model="form.avatar" required />
    </div>

    <button type="submit" :disabled= "passwordsDoNotMatch">
      {{ isLoading ? 'Registrando...' : 'Registrarse' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #218838;
}

.error {
  margin-top: 1rem;
  color: red;
  text-align: center;
}
</style>
