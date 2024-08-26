// src/stores/auth.store.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthRequest } from '@/types/auth';
import { AuthUser } from '@/types/user';
import router from '@/router';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({
    user: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!Cookies.get('token'),
    token: () => Cookies.get('token'),
  },

  actions: {
    async login(authRequest: AuthRequest) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:8080/login', authRequest, {
          headers: { 'Content-Type': 'application/json' },
        });

        const token = response.data.token;
        console.log('Token:', token);
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
        console.log('Cookies aca con el get:', Cookies.get('token'));

        this.user = {
          id: response.data.id,
          userName: authRequest.userName,
        };

        router.push('/');
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
          this.error = 'Error de autenticación: ' + error.response.data.message;
        } else {
          this.error = 'Error de autenticación';
        }
      } finally {
        this.isLoading = false;
      }
    },

    async register(authRequest: AuthRequest) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:8080/api/auth/register', authRequest);
        const token = response.data.token;

        Cookies.set('token', token, { expires: 7 });

        this.user = {
          id: response.data.id,
          userName: authRequest.userName,
        };

        router.push('/');
      } catch (error) {
        this.error = 'Error al registrar el usuario.';
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.user = null;
      Cookies.remove('token');
      router.push('/login');
    },

    async checkAuth() {
      const token = Cookies.get('token'); // Asegúrate de que obtienes el token correctamente
      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.user = {
            id: response.data.id,
            userName: response.data.userName,
          };
          return true; // Indica que el usuario ha sido autenticado
        } catch (error) {
          this.logout();
          return false; // Indica que la autenticación ha fallado
        }
      } else {
        this.logout();
        return false; // Indica que no hay token y la autenticación ha fallado
      }
    }
    ,
  },
});
