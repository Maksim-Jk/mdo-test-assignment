import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from '@/features/auth/model/store/auth.store'
import { appealsStore } from '@/features/appeals/model/store/appeals.store'
import { dictionariesStore } from '@/features/dictionaries/model/dictionaries.store'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: authStore,
    appeals: appealsStore,
    dictionaries: dictionariesStore
  }
})

export default store
