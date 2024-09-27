<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { LoginRequest } from "@/types/auth";

const emit = defineEmits(["loginSuccess"]);
const authStore = useAuthStore();
const isLoading = computed(() => authStore.auth.isLoading);
const error = computed(() => authStore.auth.error);

const form = reactive({
  email: "",
  password: "",
});

const login = async () => {
  const loginRequest: LoginRequest = {
    email: form.email,
    password: form.password,
  };

  await authStore.login(loginRequest);
  if (authStore.auth.isAuthenticated) {
    emit("loginSuccess");
  }
};

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <v-container fluid class="fill-hegiht pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Columna de Imagen -->
      <v-col cols="8" class="image-column">
        <div class="d-flex align-center ma-4">
          <v-img
            src="/src/assets/images/logo_shop.svg"
            alt="Logo"
            max-height="50"
            max-width="50"
            class="mr-3 ml-0"
          ></v-img>
          <span class="text-h5">MiTienda.com</span>
        </div>
      </v-col>

      <!-- Columna del Formulario -->
      <v-col cols="4" class="form-column d-flex justify-center">
        <div class="form-container">
          <h4 class="login-title my-1 text-h4">¡Bienvenido de vuelta! 👋🏻</h4>
          <span>Inicia sesión en tu cuenta para continuar</span>
          <v-form @submit.prevent="login" class="login-form">
            <span>Email</span>
            <v-text-field
              v-model="form.email"
              placeholder="Ingresa tu email"
              required
              :disabled="isLoading"
              hide-details
              bg-color="white"
              density="compact"
              autofocus
              class="form-input"
              variant="outlined"
            ></v-text-field>
            <span>Contraseña</span>
            <v-text-field
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Ingresa tu contraseña"
              required
              :disabled="isLoading"
              hide-details
              bg-color="white"
              density="compact"
              class="form-input"
              variant="outlined"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="togglePasswordVisibility"
            ></v-text-field>
            <v-btn
              class="login-button mt-8"
              :loading="isLoading"
              :disabled="isLoading"
              color="#00B0FF"
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.image-column {
  background-image: url("/src/assets/images/login_photo_2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

.form-input {
  background-color: #f5f5f5; /* Cambia el color de fondo */
  border-radius: 8px; /* Redondea las esquinas */
  margin: 10px;
  margin-left: 0;
  margin-right: 0;
}

/* Estilos más específicos para el input interno */
.form-input .v-input__control .v-input__slot {
  display: flex;
  align-items: center;
}

/* Estilos para el texto del placeholder */
.form-input .v-input__control .v-input__slot input::placeholder {
  color: #999; /* Cambia el color del placeholder */
}

/* Eliminar el outline azul en focus */
.form-input .v-input__control .v-input__slot input:focus {
  outline: none;
  box-shadow: none;
}

/* Ajustar el contenedor del input para incluir el append-inner-icon */
.form-input .v-input__control .v-input__slot .v-input__append-inner {
  margin-left: auto;
  display: flex;
  align-items: center;
}

/* Eliminar el borde del input cuando está en focus */
.form-input .v-input__control .v-input__slot:focus-within {
  border-color: transparent;
}

.form-column {
  background-color: #ffffff;
  padding: 20px;
  margin-top: 5rem;
  font-family: "Montserrat", sans-serif;
}
.login-form {
  width: 100%;
  margin-top: 5rem;
}

.login-title {
  text-align: start;
  font-size: 1.5rem;
  color: #333;
}

.login-button {
  background-color: #00b0ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
}

.login-button:hover {
  box-shadow: 0 0 10px #00b0ff, 0 0 2px #00b0ff, 0 0 2px #00b0ff;
}

.register-button {
  background-color: #0088cc;
  color: white;
}
</style>
