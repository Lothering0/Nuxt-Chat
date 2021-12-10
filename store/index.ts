import Vuex from 'vuex'
import MainModule from '@/store/modules/'

export function createStore() {
  return new Vuex.Store({
    modules: {
      MainModule
    }
  })
}
