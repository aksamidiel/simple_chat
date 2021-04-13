const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

// получение имени пользователя и комнаты чата
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io()

//подключение к чату
socket.emit('joinRoom', {username, room})



socket.on('message', message =>{
    console.log(message)
    outputMessage(message)
    //прокрутка сообщений чата к последнему по длине всех сообщений
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// отправка сообщения

chatForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const msg = e.target.elements.msg.value
    // получение сообщения на сервере
    socket.emit('chatMessage', msg)

    e.target.elements.msg.focus()
})

function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
                     <p class="text">
                            ${message.text}
                     </p>`
    document.querySelector('.chat-messages').appendChild(div)

}
