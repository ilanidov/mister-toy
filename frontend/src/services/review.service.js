import { httpService } from './http.service.js'

const BASE_URL = 'review/'

export const reviewService = {
    query,
    get,
    remove,
    save,
    getEmptyReview,
}

function query(toyId) {
    console.log('toyId:', toyId)
    return httpService.get(BASE_URL + toyId)
}

function get(reviewId) {
    return httpService.get(BASE_URL + reviewId)
}

function remove(reviewId) {
    return httpService.delete(BASE_URL + reviewId)
}

function save(review) {
    console.log("review", review)
    if (review._id) {
        return httpService.put(BASE_URL, review)
    } else {
        return httpService.post(BASE_URL, review)
    }
}


function getEmptyReview() {
    return {
        toyId: '',
        txt: '',
    }
}