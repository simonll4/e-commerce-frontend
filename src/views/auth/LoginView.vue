<script setup lang="ts">
import LoginForm from "@/components/forms/LoginForm.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();
const router = useRouter();

const onLoginSuccess = () => {
  if (authStore.user.isAdmin) {
    router.push({ name: "Dashboard" });
    return;
  } else {
    router.push({ name: "Home" });
  }
};
</script>

<template>
  <div class="auth-container">
    <LoginForm @loginSuccess="onLoginSuccess" />
  </div>
</template>

<style scoped>
  .auth-container {
    max-width: 100%;
    margin: 0 auto;
    background-color: white;
  }
</style>
