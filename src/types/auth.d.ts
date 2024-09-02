export interface AuthRequest {
  userName: string;
  password: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthUser {
  id: string;
  userName: string;
  password: string;
}