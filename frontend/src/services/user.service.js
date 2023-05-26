import { asyncStorageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    addActivity,
    getEmptyCredentials,
    editUser

}

// window.us = userService

function getById(userId) {
    return asyncStorageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return asyncStorageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, activities: [] }
    return asyncStorageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function addActivity(activity) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (!user._id) return Promise.reject('Not logged in')
            user.activities.push(activity)
            return asyncStorageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.activities
                })
        })
}

function editUser(newName) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (!user._id) return Promise.reject('Not logged in')
            user.fullname = newName
            return asyncStorageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.activities // why?
                })
        })

}


function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, activities: user.activities }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



