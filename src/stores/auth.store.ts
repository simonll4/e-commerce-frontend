import { defineStore } from 'pinia';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async login(email: string, password: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(this.user)); // Guardar el usuario en localStorage
      } catch (error) {
        this.error = 'Error al iniciar sesión';
      } finally {
        this.isLoading = false;
      }
    },

    async register(email: string, password: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(this.user)); // Guardar el usuario en localStorage
      } catch (error) {
        this.error = 'Error al registrar';
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.isLoading = true;
      this.error = null;
      try {
        await signOut(auth);
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('user'); // Eliminar el usuario de localStorage
      } catch (error) {
        this.error = 'Error al cerrar sesión';
      } finally {
        this.isLoading = false;
      }
    },

    checkAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(this.user)); // Guardar el usuario en localStorage
        } else {
          this.user = null;
          this.isAuthenticated = false;
          localStorage.removeItem('user'); // Eliminar el usuario de localStorage
        }
      });
    },
  },
});