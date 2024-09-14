import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LoginRequest, AuthState, AuthUser, RegisterRequest } from '@/types/auth';
import router from '@/router';

import AuthServices from '@/services/auth.services';

const service = new AuthServices();

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({
    //user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  getters: {
    token: () => localStorage.getItem('token'),
    //userId: (state) => state.user?.id || null,
  },

  actions: {

    async login(loginRequest: LoginRequest) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await service.login(loginRequest);
        const { access_token, refresh_token } = response.data;

        localStorage.setItem('token', access_token);
        Cookies.set('refresh_token', refresh_token, {
          expires: 16,
          secure: true,
          sameSite: 'Strict',
          path: '/',
        });
        this.isAuthenticated = true;
        router.push({ name: 'Home' });
      } catch (error) {
        this.error = 'Error de autenticación';
        console.error('Error al iniciar sesión:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async register(registerRequest: RegisterRequest) {
      this.isLoading = true;
      this.error = null;
      try {
        console.log('registerRequest:', registerRequest);
        const response = await service.register(registerRequest);
       
        router.push('/');
      } catch (error) {
        this.error = 'Error al registrar el usuario.';
        console.error('Error al registrar el usuario:', error);
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      localStorage.removeItem('token');
      Cookies.remove('refresh_token', { path: '/', secure: true, sameSite: 'Strict' });
      router.push({ name: 'Login' });
    },

    async checkAuth() {
      try {
        await service.checkAccessToken();
        return true;
      } catch (error) {
        console.error('Error al verificar hgjghjgjchgfgfdgel token:');
        const refreshToken = Cookies.get('refresh_token');
        if ((error as any).response && (error as any).response.status === 401 && refreshToken) {
          try {
            const response = await service.refreshToken(refreshToken);
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
            return true;
          } catch (refreshError) {
            console.error('Error al renovar el token:', refreshError);
            this.logout();
            return false;
          }
        } else {
          console.error('Error al verificar el token:', error);
          this.logout();
          return false;
        }
      }
    }

  },
});

