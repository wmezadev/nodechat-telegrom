const store = require('./store');

function addChat(users) {
    if(!users || !Array.isArray(users)){
        return Promise.reject('Los datos son incorrectos');
    }
    const chat = {
        users: users,
    }
    store.add(chat);
}

function listChats (userId) {
    return store.list(userId);
}

module.exports = {
    listChats: listChats,
    addChat: addChat
}