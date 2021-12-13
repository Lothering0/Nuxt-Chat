import { io } from 'socket.io-client'

const uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000'
  : `http://${process.env.HOST}:9000`

export default io(uri)
