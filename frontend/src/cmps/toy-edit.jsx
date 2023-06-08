import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/toy.action.js"
import { toyService } from "../services/toy.service.js"
import { labelService } from "../services/label.service.js"


import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { uploadService } from "../services/upload.service.js"


export function ToyEdit() {

    const [labels, setLabels] = useState([])
    const [toyImage, setToyImage] = useState(null)
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        labelService.query()
            .then(labels => {
                setLabels(labels)
                if (toyId) loadToy()
            })
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)

        } catch (error) {

            console.log('Had issued in toy edit:', error);
            navigate('/toy')
            showErrorMsg('Toy not found!')
        }

    }

    async function onHandleImg(ev) {
        try {
            const imgUrl = await uploadService.uploadImg(ev)
            setToyToEdit((preToyToEdit) => ({ ...toyToEdit, image: imgUrl }))
        } catch (err) {
            console.log('Cannot upload image right now..', err);
        }
    }


    function handleChange({ target }) {
        const field = target.name
        const value = (target.type === 'number') ? (+target.value || '') :
            (target.type === 'checkbox') ? target.checked :
                target.value

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                navigate('/toy')
                showSuccessMsg(`Toy '${savedToy._id}' saved!`)
            })
    }

    function onHandleLabel({ target }) {
        const label = target.id
        console.log('label:', label)
        const idx = toyToEdit.labels.findIndex(curLabel => curLabel === label)
        if (idx === -1) {
            setToyToEdit((prevToy) => {
                return { ...prevToy, labels: [...prevToy.labels, label] }
            }
            )
        } else {
            setToyToEdit((prevToy) => {
                // * With filter
                // const updatedLabels = toyToEdit.labels.filter(curLabel => curLabel !== label)
                // return {
                //     ...prevToy,
                //     labels: updatedLabels
                // }
                // * With slice
                return {
                    ...prevToy,
                    labels: [...prevToy.labels.slice(0, idx), ...prevToy.labels.slice(idx + 1)]
                }
            })
        }
    }

    const labelsAsStr = JSON.stringify(toyToEdit.labels)


    const { title, price, image } = toyToEdit

    return (
        <section className="toy-edit-container">
            <h2>Update Toy</h2>

            <form className="toy-edit-inputs" onSubmit={onSaveToy}>
                <label htmlFor="title">Name:</label>
                <input required onChange={handleChange} value={title} type="text" name="title" id="title" placeholder="Enter new name" />

                <label htmlFor="price">Price:</label>
                <input required onChange={handleChange} value={price} type="number" name="price" id="price" placeholder="Enter new price" />

                {/* <label htmlFor="image">Picture url:</label>
                <input required onChange={handleChange} value={image} type="text" name="image" id="image" placeholder="Enter image url" /> */}

                <label>Toy In Stock</label>
                <input type="checkbox" name="inStock" value={toyToEdit.inStock} checked={toyToEdit.inStock} onChange={handleChange} />


                <input type="file" accept="image/png/jpeg" onChange={onHandleImg} />
                {toyImage &&
                    <img
                        alt="not found"
                        height={"150px"}
                        src={URL.createObjectURL(toyImage)}
                    />
                }

                <pre>
                    {labelsAsStr}
                </pre>

                {/* <div className="label-container">
                    <label>Labels:</label>
                    <ul>
                        {labels.map(label => {
                            return <li
                                onClick={onHandleLabel}
                                id={label}
                                key={label}
                                className={`${labelsAsStr.includes(label) ? 'marked' : 'black'}`}
                            >
                                {label}
                            </li>
                        })}
                    </ul>
                </div> */}


                <button> Save </button>
            </form>

            <button onClick={() => navigate('/toy')}> Back </button>

        </section>
    )
}