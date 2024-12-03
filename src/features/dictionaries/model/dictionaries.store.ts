/* eslint-disable camelcase */
import { DictionariesService, DictionaryTypes } from '@/shared/api/dictionaries/dictionaries.service'
import { PremiseDictionaryDto } from '@/shared/api/dictionaries/types'
import { ActionContext, Dispatch } from 'vuex'

type RootState = Record<string, never>

export interface DictionariesState {
  dictionaries: {
    [key in DictionaryTypes]: PremiseDictionaryDto[];
  } | Record<string, never>;
  isLoading: boolean;
  error: string | null;
  cache: Record<string, PremiseDictionaryDto[]>;
}

export const dictionariesStore = {
  namespaced: true,
  state: (): DictionariesState => ({
    dictionaries: {},
    isLoading: false,
    error: null,
    cache: {}
  }),
  mutations: {
    setDictionary (state: DictionariesState, { name, data }: { name: DictionaryTypes, data: PremiseDictionaryDto[] }) {
      state.dictionaries[name] = data
    },
    setLoading (state: DictionariesState, loading: boolean) {
      state.isLoading = loading
    },
    setError (state: DictionariesState, error: string | null) {
      state.error = error
    },
    setCache (state: DictionariesState, { key, data }: { key: string, data: PremiseDictionaryDto[] }) {
      state.cache[key] = data
    }
  },
  actions: {
    async fetchDictionary ({ commit, state }: ActionContext<DictionariesState, RootState>, { name, options }: { name: DictionaryTypes, options: Record<string, string> }) {
      const cacheKey = `${name}-${JSON.stringify(options)}`

      if (state.cache[cacheKey]) {
        commit('setDictionary', { name, data: state.cache[cacheKey] })
        return
      }

      try {
        commit('setLoading', true)
        commit('setError', null)

        const service = DictionariesService.getInstance()
        const data = await service.getDictionary(name, options)
        commit('setDictionary', { name, data })
        commit('setCache', { key: cacheKey, data })
      } catch (error) {
        commit('setError', (error as Error).message || 'Ошибка при загрузке справочника')
        throw error
      } finally {
        commit('setLoading', false)
      }
    }
  },
  getters: {
    dictionaries: (state: DictionariesState) => state.dictionaries,
    isLoading: (state: DictionariesState) => state.isLoading,
    error: (state: DictionariesState) => state.error,
    getByName: (state: DictionariesState) => async (name: DictionaryTypes, dispatch: Dispatch, options: Record<string, string>) => {
      const cacheKey = `${name}-${JSON.stringify(options)}`
      console.log(cacheKey)

      if (!state.cache[cacheKey]) {
        await dispatch('dictionaries/fetchDictionary', { name, options }, { root: true })
      }
      return state.cache[cacheKey] ?? []
    }
  }
}
