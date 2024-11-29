import type { UserDto } from '@/shared/api/auth/types'
import { BaseApiService } from '../base-api.service'

export class AuthService extends BaseApiService {
    private static instance: AuthService;

    public static getInstance (): AuthService {
      if (!AuthService.instance) {
        AuthService.instance = new AuthService()
      }
      return AuthService.instance
    }

    public async login (username: string, password: string): Promise<UserDto> {
      const response = await this.api.post<UserDto>('/auth/login/', {
        username,
        password
      })
      return response.data
    }

    public async logout (): Promise<void> {
      await this.api.post('/logout')
    }
}
