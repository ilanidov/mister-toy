import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"
import { reviewService } from "../services/review.service.js"
import { AddReview } from "../cmps/add-review.jsx"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(toyService.getEmptyToy())

    const { toyId } = useParams()
    const navigate = useNavigate()
    const [review, setReview] = useState(reviewService.getEmptyReview())
    const [reviews, setReviews] = useState([])


    useEffect(() => {
        if (toyId.length > 1) {
            loadToy()
                .then(toy => reviewService.query(toy._id))
                .then(reviewsFromBackend => setReviews(reviewsFromBackend))
        }
    }, [toyId])

    function handleReviewChange({ target }) {
        const { value, name: field, } = target
        setReview((prevReview) => ({ ...prevReview, [field]: value, toyId: toy._id }))
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        try {
            const savedReview = await reviewService.save(review)
        } catch (err) {
            console.log("Couldn't save review, err:", err)
        }
    }

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
            return toy
        } catch (error) {

            console.log('Had issues in toy details', error)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }

    }

    const inventory = toy.inStock ? 'In stock' : 'Not available'

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">

            <section className='toy-details-info'>
                <h2>{toy.title}</h2>
                <h3>Price: ${toy.price}</h3>
                <h3>{inventory}</h3>
                <section>
                    {toy.labels.map((label, idx) =>
                        <small key={label + idx} >{label} | </small>
                    )}
                </section>
                <section className='toy-info-btns'>

                    <button onClick={() => navigate('/toy')}> Back </button>
                    <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    <AddReview toy={toy} handleReviewChange={handleReviewChange} onSaveReview={onSaveReview} />
                    <ul className="review-list">
                        {reviews.map(review => <li key={review._id}>{review.txt}</li>)}
                    </ul>
                </section>
            </section>
            <section className='toy-details-image'>
                <img src={toy.image} alt="" />
            </section>

        </section>
}