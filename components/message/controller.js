const store = require('./store');
const socket = require('../../socket').socket;

function addMessage(chat, user, message, file) {
    return new Promise ((resolve, reject) => {
        if(!chat || !user || !message){
            console.error('[messageController] No hay usuario o mensaje');
            reject('Los datos son incorrectos');
            return false;
        }
        let fileUrl = '';
        if (file) {
            fileUrl = `${process.env.APP_URL}:${process.env.APP_PORT}/app/files/` + file.filename;
        }
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            file: fileUrl,
            date: new Date()
        }
        store.add(fullMessage);
        socket.io.emit('message', fullMessage);
        resolve(fullMessage);
    });
}

function getMessages (filterUser) {
    return new Promise ((resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function updateMessage (id, message) {
    return new Promise (async (resolve, reject) => {
        if(!id || !message){
            reject('Invalid data');
            return false;
        }
        const result = await store.updateMessage(id, message);
        resolve(result);
    });
}

function deleteMessage (id) {
    return new Promise (async (resolve, reject) => {
        if(!id){
            reject('Invalid Id');
            return false;
        }
        const result = await store.deleteMessage(id);
        resolve(result);
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};