
const Model = require('./model');

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterUser !== null) {
            filter = { user: filterUser };
        } 
       Model.find(filter)
            .populate('user')
            .exec((error, populate) => {
                if(error){
                    reject(error);
                    return false;
                }
                resolve(populate);
            })
    })
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