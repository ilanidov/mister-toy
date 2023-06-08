import { useDispatch, useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'

// import { ToyList } from '../cmps/toy-list.jsx'
// import { ToyFilter } from '../cmps/toy-filter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { ADD_CAR_TO_CART } from '../store/toy.reducer.js'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { ToySort } from '../cmps/toy-sort.jsx'



export function ToyIndex() {
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    // const dispatch = useDispatch()
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const [sortBy, setSortBy] = useState({ type: 'title', desc: 1 })


    useEffect(() => {
        loadToys(filterBy,sortBy)
    }, [filterBy,sortBy])



    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (error) {
            showErrorMsg('Cannot remove toy')
        }
    }



    // function onAddToy() {
    //     const toyToSave = toyService.getEmptyToy()

    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsg(`Toy added (id: ${savedToy._id})`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot add toy')
    //         })
    // }

    // function onEditToy(toy) {
    //     const price = +prompt('New price?', toy.price)
    //     if (!price || price === toy.price) return

    //     const toyToSave = { ...toy, price }
    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot update toy')
    //         })
    // }

    // function addToToyt(toy) {
    //     console.log(`Adding ${toy.vendor} to Toyt`)
    //     showSuccessMsg('Added to Toyt')
    //     // dispatch({ type: ADD_CAR_TO_CART, toy })
    // }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    return <section className='toy-index'>
        {/* <h3>Toys App</h3> */}
        <main>
            <Link to={`/toy/edit`}>Add Toy</Link>
            <ToyFilter onSetFilter={onSetFilter} />
            <ToySort setSortBy={setSortBy} sortBy={sortBy} />
            {/* <button onClick={onAddToy}>Add random Toy ⛐</button> */}
            {/* <ToyFilter onSetFilter={onSetFilter} /> */}
            {isLoading && <h4>Loading...</h4>}
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
            />
            {/* <pre>{JSON.stringify(toyt, null, 2)}</pre> */}
        </main>
    </section>
}