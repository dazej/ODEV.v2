
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'


export default function Modal({ onClose, token, setNewSingleProduct }) {

    let { id } = useParams();





    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [price, setPrice] = useState(null);
    const [categoryId, setCategoryId] = useState(null)
    const [product_tag, setProductTag] = useState(null);
    const [image_url, setImageUrl] = useState(null);


    useEffect(() => {
        async function getDefaultData() {
            try {
              
                const response = await fetch(`https://odev-l26v.onrender.com/products/${id}`)
                const result = await response.json();
                console.log(result);
                console.log(result.name)
              
                setName(result.name);
                setDescription(result.description);
                setInventory(result.inventory);
                setPrice(result.price);
                setCategoryId(result.categoryId);
                setProductTag(result.product_tag);
                setImageUrl(result.image_url);

            } catch (error) {
                console.error(error);
            }
        }
        getDefaultData()
    }, [token, onClose]);




    async function handleSubmit(event) {
        console.log('hello')
        event.preventDefault();
        try {
            const response = await fetch(
                `https://odev-l26v.onrender.com/products/${id}`, {
                method: "PATCH",
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
            setNewSingleProduct(data)



        } catch (error) {

        }
    }




    return (
        <div className='modal'>
            <div>
                <button onClick={onClose}>Go Back</button>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Item:</label>
                <input className='modalinput' defaultValue={name} name='name' type="text" onChange={(event) => setName(event.target.value)} required></input>
                <br></br>
                <label>Description:</label>
                <input className='modalinput' defaultValue={description} name='description' type="text" onChange={(event) => setDescription(event.target.value)} required></input>
                <br></br>
                <label>Inventory:</label>
                <input className='modalinput' defaultValue={inventory} name='inventory' type="number" onChange={(event) => setInventory(event.target.value)} required></input>
                <br></br>
                <label>Price:</label>
                <input className='modalinput' defaultValue={price} name='price' type="number" onChange={(event) => setPrice(event.target.value)} required></input>
                <br></br>
                <label>Category:</label>
                <input className='modalinput' defaultValue={categoryId} name='category' type="number" onChange={(event) => setCategoryId(event.target.value)} required></input>
                <p className='modal-tags'>Casual = "1"   Sport = "2"   Chic = "3"</p>
                <br></br>
                <label>Product Tags:</label>
                <input className='modalinput' defaultValue={product_tag} name='product_tag' type="text" onChange={(event) => setProductTag(event.target.value)} required></input>
                <br></br>
                <label>Image:</label>
                <input className='modalinput' name='image_url' defaultValue={image_url} onChange={(event) => setImageUrl(event.target.value)} required></input>
                <br></br>
                <button className='submitbutton' >Submit Changes</button>
            </form>
        </div>
    )

}