import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function ModalAdd({ onClose, token, user, setProducts }) {

    let { id } = useParams();
    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState([])


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [inventory, setInventory] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('')
    const [product_tag, setProductTag] = useState('');
    const [image_url, setImageUrl] = useState('');



    useEffect(() => {
        fetchProducts()
    }, [token, user])
    async function fetchProducts() {
        try {
            const response = await fetch(
                "https://odev-l26v.onrender.com/products"
            )
            const data = await response.json();
            console.log(data);
            setProducts(data)
        } catch (error) {
            console.error(error);
        }
    }



    async function handleSubmit(event) {
        console.log('hello')
        event.preventDefault();
        try {
            const response = await fetch(
                `https://odev-l26v.onrender.com/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    inventory: inventory,
                    categoryId: categoryId,
                    price: price,
                    product_tag: product_tag,
                    image_url: image_url
                })
            }
            )
            console.log("made it here")
            const data = await response.json();
            console.log(data);

        } catch (error) {

        }
    }




    return (
        <div className='modal-containter'>
            <div className='addmodal'>
                <div>
                    <button onClick={onClose}>Hide Form</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Item:</label>
                    <input className='modalinput' value={name} name='name' type="text" onChange={(event) => setName(event.target.value)} required></input>
                    <br></br>
                    <label>Description:</label>
                    <input className='modalinput' value={description} name='description' type="text" onChange={(event) => setDescription(event.target.value)} required></input>
                    <br></br>
                    <label>Inventory:</label>
                    <input className='modalinput' value={inventory} name='inventory' type="number" onChange={(event) => setInventory(event.target.value)} required></input>
                    <br></br>
                    <label>Price:</label>
                    <input className='modalinput' value={price} name='price' type="number" onChange={(event) => setPrice(event.target.value)} required></input>
                    <br></br>
                    <label>Category:</label>
                    <input className='modalinput' value={categoryId} name='category' type="number" onChange={(event) => setCategoryId(event.target.value)} required></input>
                    <p className='modal-tags'>Casual = "1"   Sport = "2"   Chic = "3"</p>
                    <br></br>
                    <label>Product Tags:</label>
                    <input className='modalinput' value={product_tag} name='product_tag' type="text" onChange={(event) => setProductTag(event.target.value)} required></input>
                    <br></br>
                    <label>Image:</label>
                    <input className='modalinput' name='image_url' value={image_url} onChange={(event) => setImageUrl(event.target.value)} required></input>
                    <br></br>
                    <button className='submitbutton' >Submit Changes</button>
                </form>
            </div>
        </div>
    )

}