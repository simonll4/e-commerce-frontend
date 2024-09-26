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

const passwordsDoNotMatch = computed(
  () => form.password !== form.confirmPassword
);

const register = async () => {
  if (passwordsDoNotMatch.value) return;

  const registerRequest: RegisterRequest = {
    name: form.name,
    email: form.email,
    password: form.password,
    role: "customer",
    avatar: form.avatar,
  };

  try {
    await authStore.register(registerRequest);
    if (isAuthenticated) {
      emit("registerSuccess");
    }
  } catch (e) {
    console.error("Error during registration:", e);
  }
};
</script>

<template>
  <v-container fluid class="d-flex fill-height pa-0">
    <v-row no-gutters class="fill-height align-center justify-center">
      <!-- Columna del Formulario -->
      <v-col cols="12" lg="12" class="form-column pa-5">
        <div class="form-container">
          <h2 class="register-title">Registro</h2>
          <v-form @submit.prevent="register">
            <v-row>
              <!-- Columna Izquierda con Campos -->
              <v-col cols="12" md="6">
                <v-text-field v-model="form.name" placeholder="Ingresa tu nombre" outlined dense required
                  :disabled="isLoading" hide-details></v-text-field>

                <v-text-field v-model="form.email" placeholder="Ingresa tu correo" outlined dense required
                  :disabled="isLoading" hide-details type="email" class="mt-4"></v-text-field>

                <v-text-field v-model="form.password" placeholder="Ingresa tu contraseña" type="password" outlined dense
                  required :disabled="isLoading" hide-details class="mt-4"></v-text-field>

                <v-text-field v-model="form.confirmPassword" placeholder="Repite tu contraseña" type="password" outlined
                  dense required :disabled="isLoading" hide-details class="mt-4"></v-text-field>
              </v-col>

              <!-- Columna Derecha con Avatar -->
              <v-col cols="12" md="6" lg="6" class="d-flex flex-column align-center justify-center">
                <v-img :src="form.avatar || 'https://via.placeholder.com/150'" alt="Previsualización del Avatar"
                  max-width="150" class="avatar-preview mb-4"></v-img>

                <v-text-field v-model="form.avatar" placeholder="Ingresa la URL de tu avatar" outlined dense required
                  :disabled="isLoading" class="input-width" hide-details></v-text-field>
              </v-col>
            </v-row>

            <v-btn class="register-button input-width mt-6" :loading="isLoading" :disabled="isLoading" color="primary"
              type="submit" block>
              <span v-if="!isLoading">Registrarse</span>
            </v-btn>

            <v-alert v-if="error" type="error" class="mt-4" transition="scale-transition" border="start" prominent>
              {{ error }}
            </v-alert>
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

.form-column {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  width: 100%;
}

.register-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.avatar-preview {
  width: 100%;
  border-radius: 50%;
  border: 2px solid #00b0ff;
}

.input-width {
  width: 100%;
}

.register-button {
  background-color: #00b0ff;
}

/* Reducir tamaño de la fuente en los inputs */
.v-text-field .v-input__control {
  font-size: 0.9rem;
}
</style>
