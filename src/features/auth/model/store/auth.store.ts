import router, { ROUTE_NAMES } from '@/app/router'
import { ActionContext } from 'vuex'
import { AuthState, RootState } from './types'
import { UserDto } from '../../api/types'
import { AuthService } from '../../api/auth.service'

export const authStore = {
  namespaced: true,
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),
  mutations: {
    setUser (state: AuthState, user: UserDto | null) {
      state.user = user
      state.isAuthenticated = !!user
    },
    setLoading (state: AuthState, loading: boolean) {
      state.isLoading = loading
    },
    setError (state: AuthState, error: string | null) {
      state.error = error
    }
  },
  actions: {
    async init ({ commit }: ActionContext<AuthState, RootState>) {
      const token = localStorage.getItem('token')
      if (token) {
        commit('setUser', { key: token })
      }
    },
    async login ({ commit }: ActionContext<AuthState, RootState>, { username, password }: { username: string, password: string }) {
      try {
        commit('setLoading', true)
        commit('setError', null)

        const authService = AuthService.getInstance()
        const response = await authService.login(username, password)

        localStorage.setItem('token', response.key)
        commit('setUser', response)

        return response
      } catch (error) {
        commit('setError', 'Ошибка авторизации')
        throw error
      } finally {
        commit('setLoading', false)
      }
    },
    async logout ({ commit }: ActionContext<AuthState, RootState>) {
      try {
        localStorage.removeItem('token')
        commit('setUser', null)
        router.push({ name: ROUTE_NAMES.LOGIN })
      } catch (error) {
        commit('setError', 'Ошибка при выходе из системы')
        throw error
      }
    }
  },
  getters: {
    isAuthenticated: (state: AuthState) => state.isAuthenticated,
    user: (state: AuthState) => state.user,
    isLoading: (state: AuthState) => state.isLoading,
    error: (state: AuthState) => state.error
  }
}
