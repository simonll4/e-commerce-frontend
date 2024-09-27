import { defineStore } from 'pinia';

import { CreateUser, UpdateUser, User } from '@/types/user'
import UserServices from '@/services/user.services';

const service = new UserServices();

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [] as User[],
    isLoading: false,
    error: null as string | null,
    filteredUsers: {
      limit: 8,
    }
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await service.getUsers(this.filteredUsers);
        this.users = response.data;
        console.log('fetchUsers', this.users);
      } catch (error) {
        this.error = 'Error al cargar los usuarios';
      } finally {
        this.isLoading = false;
      }
    },
    async fetchUserById(userId: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await service.getUserById(userId);
        return response.data;
      } catch (error) {
        this.error = 'Error al cargar el usuario';
      } finally {
        this.isLoading = false;
      }
    },
    async createUser(user: CreateUser) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await service.createUser(user);
        this.users.push(response.data);
      } catch (error) {
        this.error = 'Error al crear el usuario';
      } finally {
        this.isLoading = false;
      }
    },
    async updateUser(userId: string, user: UpdateUser) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await service.updateUser(userId, user);
        const index = this.users.findIndex((u) => u.id === Number(userId));
        this.users[index] = response.data;
      } catch (error) {
        this.error = 'Error al actualizar el usuario';
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUser(userId: string) {
      this.isLoading = true;
      this.error = null;
      try {
        await service.deleteUser(userId);
        this.users = this.users.filter((u) => u.id !== Number(userId));
      } catch (error) {
        this.error = 'Error al eliminar el usuario';
      } finally {
        this.isLoading = false;
      }
    }
  }
});