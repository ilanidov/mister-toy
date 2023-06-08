import {useState, useEffect} from 'react'
import { reviewService } from '../services/review.service'

export function AddReview({ toy, onSaveReview, handleReviewChange }) {
 
    useEffect(() => {

        const fetchReviews = async () => {
            try {
                const data = await reviewService.query() 
                console.log("data:", data)
            } catch (err) {
                console.error("Failed fetching reviews")
            } 
        }

        fetchReviews()

    }, [])
    

    function onSubmitReview(ev) {
        ev.preventDefault()
        onSaveReview(ev)
    }


    return (
        <article className="text">
            <form onSubmit={onSubmitReview}>
                <label htmlFor="add-review">Any thoughts about {toy.name}?</label>
                <br />
                <input
                    type="text"
                    id="add-review"
                    name="txt"
                    onChange={handleReviewChange}>
                </input>
                <button>Add review</button>
            </form>
        </article>

    )
}