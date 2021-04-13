const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// получение имени пользователя и комнаты чата
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io()

//подключение к чату
socket.emit('joinRoom', {username, room})

socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})



socket.on('message', message =>{
    console.log(message)
    outputMessage(message)
    //прокрутка сообщений чата к последнему по длине всех сообщений
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// отправка сообщения

chatForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    let msg = e.target.elements.msg.value
    msg = msg.trim()
    // получение сообщения на сервере
    socket.emit('chatMessage', msg)
    if (!msg) {
        return false
    }

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    const p = document.createElement('p')
    p.classList.add('meta')
    p.innerText = message.username
    p.innerHTML+=`<span>${message.time}</span>`
    div.appendChild(p)
    const para = document.createElement('p')
    para.classList.add('text')
    para.innerText = message.text
    div.appendChild(para)
    document.querySelector('.chat-messages').appendChild(div)    
}

//добавление комнаты в дом-модель страницы
function outputRoomName(room){
    roomName.innerText = room
}


//добавление юзера в DOM
function outputUsers(users) {
    userList.innerHTML = ''
    users.forEach((user) => {
      const li = document.createElement('li')
      li.innerText = user.username;
      userList.appendChild(li)
    })
  }


// логика выхода пользователя из комнаты
document.getElementById('leave-btn').addEventListener('click', ()=>{
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
})