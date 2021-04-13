const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const formatMessage = require('./utils/messages')
const {userJoin, getCurrentUser, userInChat, getRoomsUsers} = require('./utils/users')


const app = express()
const server = http.createServer(app)
const io = socketIO(server)



app.use(express.static(path.join(__dirname, 'public'))) //static folder 

const botName = 'SimpleBot'

// запускается когда происходит подключение клиентов
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) =>{
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

        socket.emit('message', formatMessage(botName, 'Welcom to chat'))

    // широковещательный оповещение при подключении клиентов
    socket.broadcast.to(user.room).emit('message', 
    formatMessage(botName, `${user.username} has joined in chat`))

    // получение сообщений из чата

    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit("chatMessage", formatMessage(user.username, msg))
    })
    // запускается когда кто то из пользователей отключается

    socket.on('disconnect', () => {
        const user = userInChat(socket.id)

        if(user){
            io.to(user.room)
            .emit(botName, `${user.username} user has left the chat`)
        }
        
    })
    })

   
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))


