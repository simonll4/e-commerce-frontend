<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push('auth/login');
};

const goToRegister = () => {
  router.push('auth/register');
};
</script>

<template>
  <v-btn color="black" @click="goToLogin" class="mr-2 bg-white">Ingresar</v-btn>
  <v-btn color="white" class="font-weight-bold bg-light-blue-lighten-2 glow-button" @click="goToRegister">Crea Tu Cuenta</v-btn>
</template>

<style scoped>
.v-btn {
  margin-left: 10px;
}

.glow-button {
  transition: box-shadow 0.4s ease-in-out;
}

.glow-button:hover {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5), 0 0 20px rgba(0, 123, 255, 0.3), 0 0 30px rgba(0, 123, 255, 0.2);
}
</style>