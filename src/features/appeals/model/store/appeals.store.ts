import { AppealsService } from '@/shared/api/appeals/appeals.service'
import { IAppealsResponse } from '@/shared/api/appeals/types'
import { ActionContext } from 'vuex'

type RootState = Record<string, never>

interface AppealsState {
  appeals: IAppealsResponse[];
  isLoading: boolean;
  error: string | null;
}

export const appealsStore = {
  namespaced: true,
  state: (): AppealsState => ({
    appeals: [],
    isLoading: false,
    error: null
  }),
  mutations: {
    setAppeals (state: AppealsState, appeals: IAppealsResponse[]) {
      state.appeals = appeals
    },
    setLoading (state: AppealsState, loading: boolean) {
      state.isLoading = loading
    },
    setError (state: AppealsState, error: string | null) {
      state.error = error
    }
  },
  actions: {
    async fetchAppeals ({ commit }: ActionContext<AppealsState, RootState>) {
      try {
        commit('setLoading', true)
        commit('setError', null)

        const service = AppealsService.getInstance()
        const data = await service.getRequests()
        commit('setAppeals', data)
      } catch (error) {
        commit('setError', (error as Error).message || 'Ошибка при загрузке обращений')
        throw error
      } finally {
        commit('setLoading', false)
      }
    }
  },
  getters: {
    appeals: (state: AppealsState) => state.appeals,
    isLoading: (state: AppealsState) => state.isLoading,
    error: (state: AppealsState) => state.error
  }
}
