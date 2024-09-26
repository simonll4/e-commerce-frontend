<script setup lang="ts">
  import { ref, computed } from "vue";
  import { useAuthStore } from "@/stores/auth.store";
  import { LoginRequest } from "@/types/auth";

  // Emitir un evento cuando el login sea exitoso
  const emit = defineEmits(["loginSuccess"]);

  // form fields
  const userName = ref("");
  const password = ref("");

  const authStore = useAuthStore();
  const isLoading = computed(() => authStore.auth.isLoading);
  const error = computed(() => authStore.auth.error);

  const login = async () => {
    const loginRequest: LoginRequest = {
      email: userName.value,
      password: password.value,
    };

    await authStore.login(loginRequest);
    if (authStore.auth.isAuthenticated) {
      emit("loginSuccess");
    }
  };
</script>

<template>
  <v-container fluid class="d-flex fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Columna de Imagen -->
      <v-col cols="12" md="7" class="image-column">
        <v-img
          src="@/assets/images/login.png"
          alt="Imagen de la tienda"
          class="fill-height"
          cover
        ></v-img>
      </v-col>

      <!-- Columna del Formulario -->
      <v-col
        cols="12"
        md="5"
        class="form-column d-flex align-center justify-center"
      >
        <div class="form-container">
          <h2 class="login-title my-1">Iniciar Sesión</h2>
          <v-divider class="mb-6"></v-divider>
          <v-form @submit.prevent="login" class="login-form">
            <v-text-field
              v-model="userName"
              placeholder="Ingresa tu nombre de usuario"
              outlined
              dense
              required
              :disabled="isLoading"
              class="input-field"
              hide-details
            ></v-text-field>
            <v-text-field
              v-model="password"
              placeholder="Ingresa tu contraseña"
              type="password"
              outlined
              dense
              required
              :disabled="isLoading"
              class="input-field mt-4"
              hide-details
            ></v-text-field>
            <v-btn
              class="login-button input-width mt-6"
              :loading="isLoading"
              :disabled="isLoading"
              color="primary"
              type="submit"
              block
            >
              <span v-if="!isLoading">Ingresar</span>
            </v-btn>
            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
              transition="scale-transition"
              border="start"
              prominent
            >
              {{ error }}
            </v-alert>
            <div class="text-center mt-6">
              <p>¿No tienes una cuenta?</p>
              <router-link to="/auth/register">
                <v-btn
                  class="register-button input-field mt-2"
                  color="secondary"
                >
                  Regístrate aquí
                </v-btn>
              </router-link>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .fill-height {
    height: 100vh;
  }

  .image-column {
    background-color: #ffffff;
  }

  .form-column {
    background-color: #ffffff;
    padding: 20px;
  }

  .login-form {
    width: 20rem;
  }

  .login-title {
    text-align: center;
    font-size: 1.5rem;
    color: #333;
  }

  .input-field {
    background-color: #ffffff;
    width: 100%;
  }

  .login-button {
    background-color: #00b0ff;
  }

  .register-button {
    background-color: #0088cc;
    color: white;
  }
</style>
