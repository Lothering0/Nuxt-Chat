import { io } from 'socket.io-client'

const uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000'
  : 'http://0.0.0.0:9000'

export default io(uri)
