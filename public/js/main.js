const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

const socket = io()


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
    div.innerHTML = `<p class="meta">Brad<span>9:12pm</span></p>
                     <p class="text">
                            ${message}
                     </p>`
    document.querySelector('.chat-messages').appendChild(div)

}
