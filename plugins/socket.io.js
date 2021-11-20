import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import $socket from '@/plugins/socket-instance'

export default ({ store }) => {
  Vue.use(VueSocketIOExt, $socket, {
    store
  })
}

// https://typescript.nuxtjs.org/cookbook/components
// https://typescript.nuxtjs.org/cookbook/store/
// https://www.npmjs.com/package/vue-socket.io-extended`
