import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from '@/features/auth/model/store/auth.store'
import { appealsStore } from '@/features/appeals/model/store/appeals.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: authStore,
    appeals: appealsStore
  }
})

export default store
