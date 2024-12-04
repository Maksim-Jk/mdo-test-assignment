import { UserDto } from '../../api/types'

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type RootState = Record<string, never>
