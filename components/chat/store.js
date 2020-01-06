const Model = require('./model');

function addChat(chat) {
    const myChat = new Model(chat);
    return myChat.save();
}

async function listChats(userId) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if(userId) {
            filter = { users: userId };
        } 
        Model.find(filter)
            .populate('users')
            .exec((error, populate) => {
                if(error){
                    reject(error);
                    return false;
                }
                resolve(populate);
            })
    })
}

module.exports =  {
    add: addChat,
    list: listChats
}