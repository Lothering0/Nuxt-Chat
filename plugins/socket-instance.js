import { io } from 'socket.io-client'

const uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000'
  : 'http://0.22.0.1:9000'

export default io(uri)
