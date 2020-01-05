const db = require('mongoose');
const Model = require('./model');

db.Promise = global.Promise;
db.connect(process.env.DB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log('[db] conectada con éxito');

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages(filterUser) {
    let filter = {};
    if(filterUser !== null) {
        filter = { user: filterUser };
    } 
    const messages = await Model.find(filter);
    return messages;
}

async function updateMessage(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    });
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

function deleteMessage(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports =  {
    add: addMessage,
    list: getMessages,
    updateMessage: updateMessage,
    deleteMessage: deleteMessage
}