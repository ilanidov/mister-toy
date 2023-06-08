
import { httpService } from './http.service.js'
// import { asyncStorageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'

const BASE_URL = 'toy/'

// const STORAGE_KEY = 'toyDB'
// let gToys
// _createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}



function query(filsort = {}) {
    // return asyncStorageService.query(STORAGE_KEY).then(toys => toys)
    return httpService.get(BASE_URL, filsort)
}

function getById(toyId) {
    // return asyncStorageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)

}

function remove(toyId) {
    // return asyncStorageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    const method = (toy._id) ? 'put' : 'post'
    const toyId = (toy._id) ? toy._id : ''
    return httpService[method](BASE_URL+toyId, toy)
    // if (toy._id) {
    //     return asyncStorageService.put(STORAGE_KEY, toy)
    // } else {
    //     return asyncStorageService.post(STORAGE_KEY, toy)
    // }
}

function getDefaultFilter() {
    return { title: '', maxPrice: '', inStock: "", labels: "" }
}

function getEmptyToy() {
    return {
        title: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
        // image:'https://img.freepik.com/free-photo/play-dough-background-with-cute-octopus_23-2149700403.jpg?size=626&ext=jpg&ga=GA1.1.2138063642.1682783269&semt=ais'
        image: 'https://img.freepik.com/free-vector/hand-drawn-no-photo-sign_23-2149278213.jpg?size=626&ext=jpg&ga=GA1.1.2138063642.1682783269&semt=ais'
    }
}

// function _makeId(length = 5) {
//     var text = ''
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     for (var i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return text
// }

// function _createToys() {
//     gToys = utilService.loadFromStorage(STORAGE_KEY)
//     if (gToys && gToys.length > 0) return

//     gToys = [
//         _createToy('aa'),
//         _createToy('bb'),
//         _createToy('cc'),
//         _createToy('dd'),
//         _createToy('ee'),
//         _createToy('ff'),
//     ]
//     _saveToys()
// }

// function _createToy(title) {
//     return {
//         _id: utilService.makeId(),
//         title,
//         price: utilService.getRandomIntInclusive(50, 150),
//         labels: ['Doll', 'Battery Powered', 'Baby'],
//         createdAt: Date.now(),
//         inStock: true
//     }
// }

// function _saveToys() {
//     utilService.saveToStorage(STORAGE_KEY, gToys)
// }
