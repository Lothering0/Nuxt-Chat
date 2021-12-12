import { io } from 'socket.io-client'

console.log(process.env)

const uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000'
  : '/'

export default io(uri)
