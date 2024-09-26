<script setup lang="ts">
  import { useRouter } from "vue-router";
  import RegisterForm from "@/components/forms/RegisterForm.vue";

  const router = useRouter();

  const onRegisterSuccess = () => {
    router.push({ name: "Home" });
  };
</script>

<template>
  <div class="auth-container">
    <RegisterForm @registerSuccess="onRegisterSuccess" />
  </div>
</template>

<style scoped>
  .auth-container {
    max-width: 100%;
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
