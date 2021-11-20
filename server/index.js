const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', socket => {
  console.log('Connected')

  socket.on('newMessage', data => {
    socket.emit('createMessage', {
      text: data.text + ' server'
    })

    console.log(data.text + ' server')
  })
})

server.listen(9000, () => {
  console.log('Hello express')
})
