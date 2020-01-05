const store = require('./store');

function getUser() {
    return store.get();
}

function addUser(name) {
    if(!name){
        return Promise.reject('Invalid name');
    }
    
    const user = {
        name
    };

    return  store.add(user);

}

module.exports = {
    addUser,
    getUser
};