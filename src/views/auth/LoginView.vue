<template>
  <div class="auth-container">
    <h2>Iniciar Sesión</h2>
    <LoginForm @loginSuccess="onLoginSuccess" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import LoginForm from '@/components/forms/LoginForm.vue';

const router = useRouter();

const onLoginSuccess = () => {
  router.push({ name: 'Home' });
};
</script>
<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}
</style>

