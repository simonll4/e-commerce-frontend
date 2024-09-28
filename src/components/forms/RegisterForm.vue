<script setup lang="ts">
import { computed, reactive } from "vue"; // Import the reactive function from the vue package
import { useAuthStore } from "@/stores/auth.store";
import { RegisterRequest } from "@/types/auth";

const emit = defineEmits(["registerSuccess"]);
const authStore = useAuthStore();
const { isLoading, error, isAuthenticated } = authStore.auth;

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatar: "",
});


const register = async () => {
  if (passwordsDoNotMatch.value) return;

  const registerRequest: RegisterRequest = {
    name: form.name,
    email: form.email,
    password: form.password,
    role: "customer",
    avatar: form.avatar,
  };
  console.log("Registering user with data:", registerRequest);
  try {
    await authStore.register(registerRequest);
    if (isAuthenticated) {
      emit("registerSuccess");
    }
  } catch (e) {
    console.error("Error during registration:", e);
  }
};

const passwordsDoNotMatch = computed(
  () => form.password !== form.confirmPassword
);

// Función para codificar la URL
const encodeURL = (url: string) => {
  return encodeURI(url);
};

// Computed property para la URL codificada
const encodedAvatar = computed(() => {
  return encodeURL(form.avatar) || 'https://via.placeholder.com/150';
});
</script>

<template>
  <v-container fluid class="fill-hegiht pa-0">
    <v-row no-gutters class="fill-height">
      <v-col cols="5" class="image-column">
        <v-container>
          <div class="d-flex align-center ma-4">
            <v-img src="/src/assets/images/logo_shop.svg" alt="Logo" max-height="50" max-width="50"
              class="mr-3 ml-0"></v-img>
            <span class="text-h5">MiTienda.com</span>
          </div>
        </v-container>
      </v-col>
      <v-col cols="7" class="form-column d-flex flex-column justify-center align-center">
        <v-form @submit.prevent="register" class="login-form">
          <v-container class="pl-0">
            <h4 class="login-title my-1 text-h4">
              ¡Aquí comienza la aventura! 🛩️
            </h4>
            <span>Crea tu cuenta para continuar</span>
          </v-container>
          <v-container class="d-flex pl-0 pr-0">
            <!-- Columna izquierda de datos -->
            <v-container class="pl-0">
              <span>Tus datos personales</span>
              <v-text-field v-model="form.name" placeholder="Ingresa tu nombre" required :disabled="isLoading"
                hide-details bg-color="white" variant="outlined" density="compact" dense
                class="form-input"></v-text-field>

              <v-text-field v-model="form.email" type="email" placeholder="Ingresa tu correo" required
                :disabled="isLoading" hide-details bg-color="white" variant="outlined" density="compact" dense
                class="form-input"></v-text-field>

              <v-text-field v-model="form.password" placeholder="Ingresa tu contraseña" type="password" required
                :disabled="isLoading" hide-details bg-color="white" variant="outlined" density="compact" dense
                class="form-input"></v-text-field>

              <v-text-field v-model="form.confirmPassword" placeholder="Repite tu contraseña" type="password" required
                :disabled="isLoading" hide-details bg-color="white" variant="outlined" density="compact" dense
                class="form-input"></v-text-field>
            </v-container>
            <!-- Columna derecha de datos (Imagen del usuario) -->
            <v-container class="pr-0">
              <span>Tu foto de perfil</span>
              <!-- <v-img :src="form.avatar || 'https://via.placeholder.com/150'" alt="Previsualización del Avatar"
                max-width="150" max-height="150" class="avatar-preview mb-2"></v-img>

              <v-text-field v-model="form.avatar" placeholder="Ingresa la URL de tu avatar" required
                :disabled="isLoading" hide-details bg-color="white" variant="outlined" density="compact" dense
                class="form-input"></v-text-field> -->
              <v-img :src="encodedAvatar" alt="Previsualización del Avatar" max-width="150" max-height="150"
                class="avatar-preview mb-2"></v-img>

              <v-text-field v-model="form.avatar" placeholder="Ingresa la URL de tu avatar" required
                :disabled="isLoading" hide-details bg-color="white" variant="outlined" density="compact" dense
                class="form-input"></v-text-field>
            </v-container>
          </v-container>
          <!-- Botón de registro -->
          <v-container class="pa-0 w-50">
            <v-btn class="register-button mt-6" :loading="isLoading" :disabled="isLoading" color="#00b0ff" type="submit"
              block>
              <span v-if="!isLoading">Registrarse</span>
            </v-btn>

            <v-alert v-if="error" type="error" class="mt-4" transition="scale-transition" border="start" prominent>
              {{ error }}
            </v-alert>
          </v-container>
          <v-divider class="mt-8"></v-divider>
          <v-container class="d-flex align-center justify-center flex-row">
            <span>¿Ya tienes una cuenta? -</span>
            <router-link to="/auth/login" class="ml-2">Inicia Sesión</router-link>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.image-column {
  background-image: url("/src/assets/images/register_photo.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

.form-input {
  background-color: #f5f5f5;
  /* Cambia el color de fondo */
  border-radius: 8px;
  /* Redondea las esquinas */
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
  color: #999;
  /* Cambia el color del placeholder */
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
  font-family: "Montserrat", sans-serif;
}

.login-form {
  width: 90%;
  margin-top: 1rem;
}

.login-title {
  text-align: start;
  font-size: 1.5rem;
  color: #333;
}

.register-button {
  background-color: #00b0ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
}

.register-button:hover {
  box-shadow: 0 0 10px #00b0ff, 0 0 2px #00b0ff, 0 0 2px #00b0ff;
}
</style>
