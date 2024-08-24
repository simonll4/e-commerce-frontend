<template>
  <form @submit.prevent="register">
    <div class="form-group">
      <label for="email">Correo Electrónico</label>
      <input type="email" id="email" v-model="email" required />
    </div>

    <div class="form-group">
      <label for="password">Contraseña</label>
      <input type="password" id="password" v-model="password" required />
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirmar Contraseña</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required />
    </div>

    <button type="submit" :disabled="isLoading || passwordsDoNotMatch">
      {{ isLoading ? 'Registrando...' : 'Registrarse' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store';

// Definir `emit`
const emit = defineEmits(['registerSuccess']);

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const authStore = useAuthStore();

const isLoading = computed(() => authStore.isLoading);
const error = computed(() => authStore.error);

const passwordsDoNotMatch = computed(() => password.value !== confirmPassword.value);

const register = async () => {
  if (passwordsDoNotMatch.value) return;
  await authStore.register(email.value, password.value);
  if (authStore.isAuthenticated) {
    emit('registerSuccess'); // Emitir el evento 'registerSuccess'
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
