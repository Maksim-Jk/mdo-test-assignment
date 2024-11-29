import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from '@/features/auth/model/store/auth.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: authStore
  }
})

export default store
