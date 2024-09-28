import { LoginRequest, RegisterRequest } from '@/types/auth';
import api from './api';

export default class AuthServices {

  login(loginRequest: LoginRequest) {
    return api().post('/api/v1/auth/login', loginRequest);
  }

  register(registerRequest: RegisterRequest) {
    return api().post('/api/v1/auth/register', registerRequest);
  }

  checkAccessToken() {
    return api().get('/api/v1/auth/me');
  }

  refreshToken(refreshToken: string) {
    return api().post('/api/v1/auth/refresh-token', { refreshToken: refreshToken });
  }
}  
