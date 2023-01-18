import { io } from 'socket.io-client'

const uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000'
  : 'https://nuxt-chat-server.onrender.com'

export default io(uri)
