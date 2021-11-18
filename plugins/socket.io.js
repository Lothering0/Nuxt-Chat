import Vue from 'vue'
import { io } from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended'

const socket = io('http://localhost:3000')

export default ({ store }) => {
  Vue.use(VueSocketIOExt, socket, { store })
}

// https://typescript.nuxtjs.org/cookbook/components
// https://typescript.nuxtjs.org/cookbook/store/
// https://www.npmjs.com/package/vue-socket.io-extended`
