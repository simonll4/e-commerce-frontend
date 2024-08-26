<template>
  <form @submit.prevent="login">
    <div class="form-group">
      <label for="email">Correo Electrónico</label>
      <input type="email" id="email" v-model="email" required />
    </div>

    <div class="form-group">
      <label for="password">Contraseña</label>
      <input type="password" id="password" v-model="password" required />
    </div>

    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Iniciando...' : 'Iniciar Sesión' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store';

const emit = defineEmits(['loginSuccess']);

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const isLoading = computed(() => authStore.isLoading);
const error = computed(() => authStore.error);

const login = async () => {
  await authStore.login(email.value, password.value);
  if (authStore.isAuthenticated) {
    emit('loginSuccess'); // Emitir el evento 'loginSuccess'
  }
};
</script>

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
  background-color: #007bff;
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
  background-color: #0056b3;
}

.error {
  margin-top: 1rem;
  color: red;
  text-align: center;
}
</style>

