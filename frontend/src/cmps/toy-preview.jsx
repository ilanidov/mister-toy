import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"


export function ToyPreview({ toy, onRemoveToy }) {
    const navigate = useNavigate()

    function onHandleDeatail() {
        navigate(`/toy/${toy._id}`)

    }

    return <article  className="toy-card">
        <section onClick={onHandleDeatail}>
            <h4>{toy.title}</h4>
            <img src={toy.image} alt="" />
            <section className="toy-card-info">
                <p>Price: <span>{toy.price}$</span></p>
                {toy.inStock && <span>Toy available!</span>}
            </section>
        </section>
        <section className="card-btns">
            <button className="add-cart-btn">Add to cart</button>
            <button className="remove-btn" onClick={() => {onRemoveToy(toy._id) }}>X</button>
        </section>
        {/* <br /> */}
        {/* <Link className="detail-btn" to={`/toy/${toy._id}`}>Details</Link> */}
        {/* <br /> */}
        {/* <Link to={`/toy/edit/${toy._id}`}>Edit</Link> */}
    </article>
}