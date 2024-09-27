import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LoginRequest, AuthState, AuthUser, RegisterRequest } from '@/types/auth';
import router from '@/router';

import AuthServices from '@/services/auth.services';

const service = new AuthServices();

export const useAuthStore = defineStore('authStore', {
  state: (): { auth: AuthState; user: AuthUser; token: string | null } => ({
    auth: {
      isAuthenticated: false,
      isLoading: false,
      error: null,
    },
    user: {
      id: '',
      userName: '',
      isAdmin: false,
      email: '',
      avatar: '',
    },
    token: localStorage.getItem('token') as string | null,
  }),
  actions: {
    async login(loginRequest: LoginRequest) {
      this.auth.isLoading = true;
      this.auth.error = null;
      try {
        const response = await service.login(loginRequest);
        const user = response.data.user;
        const { access_token, refresh_token } = response.data.tokens;

        this.user = {
          id: user.id,
          userName: user.name,
          isAdmin: user.role === 'admin',
          email: user.email,
          avatar: user.avatar,
        };

        localStorage.setItem('token', access_token);
        Cookies.set('refresh_token', refresh_token, {
          expires: 16,
          secure: true,
          sameSite: 'Strict',
          path: '/',
        });
        this.auth.isAuthenticated = true;
        router.push({ name: 'Home' });
      } catch (error) {
        this.auth.error = 'Error de autenticación';
        console.error('Error al iniciar sesión:', error);
      } finally {
        this.auth.isLoading = false;
      }
    },

    async register(registerRequest: RegisterRequest) {
      this.auth.isLoading = true;
      this.auth.error = null;
      try {
        console.log('registerRequest:', registerRequest);
        const response = await service.register(registerRequest);
        router.push('/');
      } catch (error) {
        this.auth.error = 'Error al registrar el usuario.';
        console.error('Error al registrar el usuario:', error);
      } finally {
        this.auth.isLoading = false;
      }
    },

    logout() {
      localStorage.removeItem('token');
      Cookies.remove('refresh_token', { path: '/', secure: true, sameSite: 'Strict' });
      this.user = {
        id: '',
        userName: '',
        isAdmin: false,
        email: '',
        avatar: '',
      };
      router.push({ name: 'Login' });
    },

    async checkAuth() {
      try {
        const response = await service.checkAccessToken();
        const user = response.data;

        this.user = {
          id: user.id,
          userName: user.name,
          isAdmin: user.role === 'admin',
          email: user.email,
          avatar: user.avatar,
        };

        return true;
      } catch (error) {
        const refreshToken = Cookies.get('refresh_token');
        if ((error as any).response && (error as any).response.status === 401 && refreshToken) {
          try {
            const response = await service.refreshToken(refreshToken);
            const { access_token } = response.data;
            console.log('Nuevo token:', access_token);
            localStorage.setItem('token', access_token);

            // el refresh no manda info del user
            const response1 = await service.checkAccessToken();
            const user = response1.data;
            this.user = {
              id: user.id,
              userName: user.name,
              isAdmin: user.role === 'admin',
              email: user.email,
              avatar: user.avatar,
            };

            return true;
          } catch (refreshError) {
            this.logout();
            return false;
          }
        } else {

          this.logout();
          return false;
        }
      }
    },
  },
  getters: {
    token: (state) => state.token,
    userRole: (state) => state.user.isAdmin,
  },
});

