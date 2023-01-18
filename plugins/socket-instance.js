import { io } from 'socket.io-client'

const uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000'
  : process.env.BACKEND_ADDRESS

console.log(uri)
console.log(process.env.BACKEND_ADDRESS)

export default io(uri)
