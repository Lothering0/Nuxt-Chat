import Vuex from 'vuex'
import MainModule from '@/store/modules/'

// https://championswimmer.in/vuex-module-decorators/pages/getting-started.html#access-state
// https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs

export function createStore() {
  return new Vuex.Store({
    modules: {
      MainModule
    }
  })
}
