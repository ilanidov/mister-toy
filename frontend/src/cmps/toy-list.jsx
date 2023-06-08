// import PropTypes from 'prop-types'

import { ToyPreview } from "./toy-preview"

export function ToyList({ toys ,onRemoveToy}) {
    return <ul className="toy-list">
        {toys.map(toy => 

            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
                {/* <section className="card-btns">
                    <button className="add-cart-btn">Add to cart</button>
                    <button className="remove-btn" onClick={() => { onRemoveToy(toy._id) }}>Delete</button>
                </section> */}

            </li>)}
    </ul>
}