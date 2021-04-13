const users = []

// подключение пользователей к чату

function userJoin(id, username, room){
    const user = {id, username, room}

    users.push(user)
    return user
}

//получение текущего пользователя

function getCurrentUser(id){
    return users.find(user => user.id === id)
}

//пользователи в сети

function userInChat(id){
    const ind = users.findIndex(user => user.id === id)

    if(ind !== -1){
        return users.splice(ind, 1)[0]
    }
}

//получение пользователей в комнате чата
function getRoomsUsers(room){
    return users.filter(user => user.room === room)
}


module.exports = {
    userJoin,
    getCurrentUser,
    userInChat,
    getRoomsUsers
} 