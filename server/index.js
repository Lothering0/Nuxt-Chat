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
const users = require('./users')()

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) cb('Invalid credentials')

    socket.join(data.room)

    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })
    console.log(users.users)

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

  socket.on('createMessage', (data) => {
    console.log(data)
    try {
      if (!data.text) throw new Error('Text is not should be empty')

      const { name, room } = users.get(data.id)
      if (name && data.text && data.id && room) {
        io.to(room).emit('newMessage', {
          name,
          text: data.text,
          id: data.id
        })
      }
    } catch (e) {
      console.log(e.message)
    }
  })
})

server.listen(9000, () => {
  console.log('Hello express')
})
