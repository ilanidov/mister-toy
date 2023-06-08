import { toyService } from '../services/toy.service.js'
import { store } from './store.js'
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY, SET_FILTER } from './toy.reducer.js'



export async function loadToys(filterBy,sortBy) {
    const filsort = {filterBy,sortBy}
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const toys = await toyService.query(filsort)
        store.dispatch({ type: SET_TOYS, toys })
        return toys
    } catch (error) {
        console.log('toy action -> Cannot load toys', error)
        throw error
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        const res = await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
        return res
    } catch (error) {
        console.log('toy action -> Cannot remove toy', error)
        throw error
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (error) {
        console.log('toy action -> Cannot save toy', error)
        throw error
    }
}


export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}
