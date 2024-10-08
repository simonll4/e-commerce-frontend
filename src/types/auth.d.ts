export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
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
  isAdmin: boolean;
  email: string;
  avatar: string;
}

