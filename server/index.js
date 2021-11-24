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
  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) cb('Invalid credentials')

    socket.join(data.room)

    cb({ userId: socket.id })

    setTimeout(() => {
      socket.emit('newMessage', {
        name: 'Administrator',
        text: `Welcome, ${data.name}!`
      })
      socket.broadcast
        .to(data.room)
        .emit('newMessage', {
          name: 'Administrator',
          text: `User ${data.name} joined!`
        })
    }, 250)
  })

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
