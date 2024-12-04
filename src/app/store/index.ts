import Vue from 'vue'
import Vuex from 'vuex'
import { appealsStore } from '@/features/appeals-table'
import { authStore } from '@/features/auth'
import { dictionariesStore } from '@/features/dictionaries'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: authStore,
    appeals: appealsStore,
    dictionaries: dictionariesStore
  }
})

export default store
