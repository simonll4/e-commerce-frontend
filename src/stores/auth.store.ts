import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import {AuthUser } from '@/types/auth.user';
import {AuthRequest} from '@/types/auth';
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
    userId: (state) => state.user?.id || null,
  },

  actions: {
    async login(authRequest: AuthRequest) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/users', {
          params: {
            userName: authRequest.userName,
            password: authRequest.password
          }
        });

        const user = response.data.find((u: AuthUser) => 
          u.userName === authRequest.userName && u.password === authRequest.password);

        if (user) {
          const token = 'fake-jwt-token'; // Simulando un token
          Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });

          this.user = {
            id: user.id,
            userName: user.userName,
            password: authRequest.password,
          };
          

          router.push('/');
        } else {
          this.error = 'Nombre de usuario o contraseña incorrectos';
        }
      } catch (error) {
        this.error = 'Error de autenticación';
        console.error('Error al iniciar sesión:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async register(authRequest: AuthRequest) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:3000/users', {
          id: Date.now(), // Genera un ID simulado basado en la fecha/hora actual
          userName: authRequest.userName,
          password: authRequest.password // Guardamos el password en el json-server
        });

        const token = 'fake-jwt-token'; // Simulando un token
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });

        this.user = {
          id: response.data.id,
          userName: authRequest.userName,
          password: authRequest.password,
        };

        router.push('/');
      } catch (error) {
        this.error = 'Error al registrar el usuario.';
        console.error('Error al registrar el usuario:', error);
      } finally {
        this.isLoading = false;
      }
    },

    
    logout() {
      console.log('logout');
      this.user = null;
      Cookies.remove('token', { secure: true, sameSite: 'Strict' });
      router.push({ name: 'Login' });
    },

    // async checkAuth() {
    //   const token = Cookies.get('token'); 
    //   if (token) {
    //     const response = await axios.get('http://localhost:3000/users');
    //     this.user = response.data.find((u: AuthUser) => u.userName === this.user?.userName) || null;
    //     return !!this.user;
    //   } else {
    //     this.logout();
    //     return false;
    //   }
    // }
    async checkAuth() {

      const token = Cookies.get('token');
      if (!token) {
        this.logout();
        return false;
      }

      try {
        // Simula la verificación del usuario con la lista de usuarios en el servidor mock
        const response = await axios.get('http://localhost:3000/users');

        // Busca el usuario en la lista recibida desde el servidor mock
        const foundUser = response.data.find((u: AuthUser) => u.userName === this.user?.userName);

        if (foundUser) {
          this.user = foundUser; 
          return true;
        } else {
          this.logout();
          return false;
        }
      } catch (error) {
        console.error('Error verificando la autenticación:', error);
        this.error = 'Error al verificar la autenticación';
        this.logout();
        return false;
      }
    }
  },
});

