let users = [];
let rooms = []

// Join user to chat
function userJoin(id, username) {
    console.log(isUniqe(id))
    if (isUniqe(id, username)) {
        room = getToRoom(username).id
        console.log("TO JEST GET TO ROOM")
        console.log(room)
        const user = { id, username, room };
        users.push(user);
        return user;
    }
    console.log(users)
}

function isUniqe(id, username) {
    let flag = true
    if (users.length > 0) {
        users.forEach(user => {
            if (user.id == id || user.username == username) {
                flag = false
            }
        })
        if (flag) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }

}

function readyToPlay(room) {
    console.log(rooms.find(rm => rm.id == room).users.length)
    if (rooms.find(rm => rm.id == room).users.length != 2) {
        return false
    }
    return true
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {


    const index = users.findIndex(user => user.id === id);
    try {
        rooms.find(rm => rm.id == users[index].room).users = rooms.find(rm => rm.id == users[index].room).users.filter(usr => usr != users[index].username)
    } catch (error) {
    }

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}


function getToRoom(username) {

    //tworzymy nowy pokoj jesli nie ma 
    if (rooms.length <= 0) {
        rooms.push({
            id: rooms.length,
            users: [username]
        })
        return rooms[0]
    } else {
        //jesli sa jakies pokoje sprawdzamy czy ostatni jest pełny
        let rm = rooms.find(rm => rm.users.length < 2)
        if (rm) {
            rm.users.push(username)
            return rm
        } else {
            rooms.push({
                id: rooms.length,
                users: [username]
            })
            return rooms[rooms.length - 1]
        }
        // if (rooms[rooms.length - 1].users.length < 2) {
        //     //jesli nie jest pelny dolaczamy
        //     rooms[rooms.length - 1].users.push(username)
        //     return rooms[rooms.length - 1]
        // } else {
        //     //jesli kazdy pokoj jest zajety tworzymy nowy
        //     rooms.push({
        //         id: rooms.length,
        //         users: [username]
        //     })
        //     return rooms[rooms.length - 1]
        // }
    }
}


// Get room users
function getRoomUsers(room) {
    return rooms.find(rm => rm.id == room).users
}

function checkRoom(user, room) {
    if (rooms.find(rm => rm.id == user.room).users.length != 2) {
        return false
    }
    return true
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getToRoom,
    getRoomUsers,
    users,
    rooms,
    readyToPlay,
    checkRoom
};