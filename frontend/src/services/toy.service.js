
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



function query(filterBy = {}) {
    // return asyncStorageService.query(STORAGE_KEY).then(toys => toys)
    return httpService.get(BASE_URL, filterBy)
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
    return httpService[method](BASE_URL, toy)
    // if (toy._id) {
    //     return asyncStorageService.put(STORAGE_KEY, toy)
    // } else {
    //     return asyncStorageService.post(STORAGE_KEY, toy)
    // }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', status: '', labels: [] }
}

function getEmptyToy() {
    return {
        title: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
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
