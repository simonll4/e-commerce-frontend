import { User, FilterUser, CreateUser, UpdateUser } from '@/types/user'

import api from './api'

export default class UserServices {

  getUsers(filteredUsers: FilterUser) {
    const { limit } = filteredUsers;
    return api().get('/api/v1/users', {
      params: {
        limit: limit || "",
      }
    });
  }

  getUserById(userId: string) {
    return api().get<User>(`/api/v1/users/${userId}`);
  }

  createUser(user: CreateUser) {
    return api().post<User>('/api/v1/users', user);
  }

  updateUser(userId: string, user: UpdateUser) {
    return api().put<User>(`/api/v1/users/${userId}`, user
    );
  }

  deleteUser(userId: string) {
    return api().delete(`/api/v1/users/${userId}`);
  }

}