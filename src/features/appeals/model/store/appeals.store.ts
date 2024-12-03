/* eslint-disable camelcase */
import { AppealsService } from '@/shared/api/appeals/appeals.service'
import { IAppealsResponse } from '@/shared/api/appeals/types'
import { ActionContext } from 'vuex'

type RootState = Record<string, never>

interface AppealsState {
  appeals: IAppealsResponse[];
  singleAppeal: IAppealsResponse | null;
  isLoading: boolean;
  error: string | null;
  cache: Record<string, IAppealsResponse[]>;
}

export const appealsStore = {
  namespaced: true,
  state: (): AppealsState => ({
    appeals: [],
    singleAppeal: null,
    isLoading: false,
    error: null,
    cache: {}
  }),
  mutations: {
    setAppeals (state: AppealsState, appeals: IAppealsResponse[]) {
      state.appeals = appeals
    },
    setSingleAppeal (state: AppealsState, appeal: IAppealsResponse) {
      state.singleAppeal = appeal
    },
    setLoading (state: AppealsState, loading: boolean) {
      state.isLoading = loading
    },
    setError (state: AppealsState, error: string | null) {
      state.error = error
    },
    setCache (state: AppealsState, { key, data }: { key: string, data: IAppealsResponse[] }) {
      state.cache[key] = data
    }
  },
  actions: {
    async fetchAppeals ({ commit, state }: ActionContext<AppealsState, RootState>, { page = 1, page_size = 10, search = '', premise_id = null, ordering = undefined } = {}) {
      const cacheKey = `list-${page}-${page_size}-${search}-${premise_id}-${ordering}`

      if (state.cache[cacheKey]) {
        commit('setAppeals', state.cache[cacheKey])
        return
      }

      try {
        commit('setLoading', true)
        commit('setError', null)

        const service = AppealsService.getInstance()
        const data = await service.getAllAppeals({
          page: page || undefined,
          page_size: page_size || undefined,
          search: search || undefined,
          premise_id: premise_id || undefined,
          ordering: ordering || undefined
        })
        commit('setAppeals', data)
        commit('setCache', { key: cacheKey, data })
      } catch (error) {
        commit('setError', (error as Error).message || 'Ошибка при загрузке обращений')
        throw error
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchAppealById ({ commit, state }: ActionContext<AppealsState, RootState>, id: number) {
      const cacheKey = `single-${id}`

      if (state.cache[cacheKey]) {
        commit('setSingleAppeal', state.cache[cacheKey])
        return
      }

      const service = AppealsService.getInstance()
      const data = await service.getAppealById(id)
      commit('setSingleAppeal', data)
      commit('setCache', { key: cacheKey, data })
    }
  },
  getters: {
    appeals: (state: AppealsState) => state.appeals,
    getAppealById: (state: AppealsState) => (id: number) => state.cache[`single-${id}`],
    isLoading: (state: AppealsState) => state.isLoading,
    error: (state: AppealsState) => state.error
  }
}
