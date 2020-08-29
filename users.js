
let users = [];

function addUser(id, userName, room) {
    users.push({ id, userName, room });
}

function deleteUser(id) {

    let index = users.findIndex(u => u.id === id);

    if (index === -1)
        return;

    users.splice(index, 1);

}

function getUser(id) {
    return users.find(u => u.id === id);
}

function getUsers(room) {
    return users.filter(u => u.room === room);
}

module.exports = {
    addUser,
    deleteUser,
    getUser,
    getUsers
}