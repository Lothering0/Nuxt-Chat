import { io } from 'socket.io-client'

export default io('http://localhost:9000', {
  withCredentials: true
})
