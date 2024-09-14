export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  avatar: string; // URL de la imagen
}

export interface AuthState {
 // user: AuthUser | null;
  isAuthenticated
  isLoading: boolean;
  error: string | null;
 
}

export interface AuthUser {
  id: string;
  userName: string;
  role: boolean;
  password: string;
}

