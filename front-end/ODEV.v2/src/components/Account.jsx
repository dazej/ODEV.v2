import { useState, useEffect } from "react";
import ModalAll from "./ModalAll";

export default function Account({ token, newPurchasedProd, user }) {

    const [purchasedProducts, setPurchasedProducts] = useState(null);
    const [mainUser, setMainUser] = useState([]);
    const [address, setAddress] = useState([]);

    const [showModal, setShowModal] = useState(false)
 
    useEffect(() => {
        getPurchasedProducts()
    }, [token, newPurchasedProd, user])
    async function getPurchasedProducts() {
        try {
            const response = await fetch(`https://odev-l26v.onrender.com/orders/users/${user?.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log(data)
            const products = await Promise.all(data.map(async (order) => {
                const orderedProds = await fetch(`https://odev-l26v.onrender.com/products/${order?.productId}`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const data2 = await orderedProds.json();
                order.products = data2
                return data2
            }))

            setPurchasedProducts(data)

        } catch (error) {
            console.error(error);
        };
    }
    console.log(purchasedProducts)



    function adminUser() {
        if (user?.type != "admin") {
            return false;
        } else {
            return true;
        }
    }
    console.log(user?.type)




    useEffect(() => {
        async function getUserInfo() {
            try {
                const response = await fetch(`https://odev-l26v.onrender.com/users/${user.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                const data = await response.json();
                console.log(data)
                setMainUser(data)
            } catch (error) {

            }

        }
        getUserInfo()
    }, [token])

    useEffect(() => {
        async function getUserAddress() {
            try {
                const response = await fetch(`https://odev-l26v.onrender.com/address/${user.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                const data = await response.json();
                console.log(data)
                setAddress(data)
            } catch (error) {

            }

        }
        getUserAddress()
    }, [token])

    console.log(address)

    return (
        <div className="main-account-container" >
            <div className="account-title">
                <h2 >Welcome {mainUser.username}! </h2>
            </div>
            <div className="account-container">
                {showModal && <ModalAll token={token} onClose={() => {
                    setShowModal(false);
                }} />}
                <div className="orders">
                    <div>
                        <h2>Previous Orders</h2>
                    </div>
                    <div className="orders-view">
                        {purchasedProducts && purchasedProducts.map((product) => {
                            return <div key={product.products.id}>
                                <p> {product.products.name}</p>
                                <p>Quantity: {product.quantity}</p>
                                <img src={product.products.image_url} alt="image" width="100" height="100" />
                                <br />
                            </div>
                        })
                        }
                    </div>
                </div>
                <div>
                </div>
                <div className="account-details">
                    <h2>Account Information</h2>
                    <p><b>First Name:</b> <br></br>{mainUser.first_name}</p>
                    <p><b>Last Name:</b> <br></br>{mainUser.last_name}</p>
                    <p><b>Email Address:</b> <br></br>{mainUser.email}</p>
                    <p><b>Phone Number:</b> <br></br>{mainUser.phone_number}</p>
                    <b><p>Mailing Address</p></b>
                    <p>{address.street}</p><p>{address.city}</p><p>{address.state}</p>
                    {adminUser() ? <button className="products-button" onClick={() => {
                        <ModalAll />
                        setShowModal(true);
                    }}>View All Users</button> : null}
                </div>
            </div>
        </div>
    )








}