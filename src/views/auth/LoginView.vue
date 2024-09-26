<script setup lang="ts">
  import { useRouter } from "vue-router";
  import LoginForm from "@/components/forms/LoginForm.vue";
  import NavBar from "@/components/NavBar.vue";

  const router = useRouter();

  const onLoginSuccess = () => {
    router.push({ name: "Home" });
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
    padding: 2rem;
    background-color: #f9f9f9;
  }
</style>
