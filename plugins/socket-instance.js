import { io } from 'socket.io-client'

const uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000'
  : 'ws://nuxt-chat0.herokuapp.com:9000'

export default io(uri)
