const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketIO(server)



app.use(express.static(path.join(__dirname, 'public'))) //static folder 

// запускается когда происходит подключение клиентов
io.on('connection', socket => {
    console.log('New connection')

    socket.emit('message', 'Welcom to chat')

    // широковещательный оповещение при подключении клиентов
    socket.broadcast.emit('message', 'user has joined in chat')

    // запускается когда кто то из пользователей отключается

    socket.on('disconnect', () => {
        io.emit('message', 'user has left the chat')
    })


    // получение сообщений из чата

    socket.on('chatMessage', () => {
       io.emit('message', msg)
    })

   
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))


