import { useState, useEffect } from "react";
import { Link, Routes, Route } from 'react-router-dom'
import SingleProduct from "./SingleProduct";
import ModalAdd from './ModalAdd'
import NavBar from "./NavBar";


export default function Products({ user, token }) {
    const [products, setProducts] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newProductList, setNewProductList] = useState([]);


    useEffect(() => {
        fetchProducts()
    }, [token, user, newProductList])
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

    function adminUser() {
        if (user?.type != "admin") {
            return false;
        } else {
            return true;
        }
    }


    async function deleteProduct(id) {
        try {
            const response = await fetch(`https://odev-l26v.onrender.com/products/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            const result = await response.json()
            console.log(result)
            fetchProducts()
        } catch (err) {
            console.error(
                err
            );
        }
    }


    async function checkOut(id) {
        try {
            const quantity = 1;
            const userId = user.id;

            const response = await fetch(`https://odev-l26v.onrender.com/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    productId: id,
                    quantity: quantity,
                }),
            });

            const data = await response.json();

            //   if (response.ok) {
            //     setNewCart(data);;
            //   }

            //   setNewCart(data);
            console.log("Product added to cart:", data);
        } catch (error) {
            console.error("Error adding product to cart:", error.message);
        }
    }

    return (
        <div className="products-container">
            <div className="products-search">
            <NavBar/>
         
            {showModal && <ModalAdd user={user} token={token} setProducts={setProducts} products={products} onClose={() => {
                setShowModal(false);
                fetchProducts()
            }} />}
            {adminUser() ? <button className="products-button" onClick={() => {
                setShowModal(true)
            }}>Add Product</button> : null}
       
            </div>
            <div className="products-div">

                {products && products.map((product) => {
                    return (<div className="product" key={product.id}>
                        <Link className="product-link" to={`/products/${product.id}`}><div className="prod-container">
                            <p> {product.name}</p>
                            <img className="img-all" src={product.image_url} alt="image" width="100" height="100" />
                        </div></Link>
                        <br />
                        <button className="products-button" onClick={() => checkOut(product.id)}>Add to Cart</button>
                        {adminUser() ? <button className="products-button"  onClick={() => {
                            deleteProduct(product.id)
                        }}>Delete Product</button> : null}
                    </div>
                    )
                })
                }

            </div>
        </div>
    )
}