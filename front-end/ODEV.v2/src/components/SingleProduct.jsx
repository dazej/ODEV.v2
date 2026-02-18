import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'


function SingleProduct({ token, user }) {
  const [singleProduct, setSingleProduct] = useState([])
  const navigate = useNavigate()
  let { id } = useParams()

  const [showModal, setShowModal] = useState(false)





  useEffect(() => {
    getSingleProduct()
  }, [token]);

  async function getSingleProduct() {
    try {
      // your fetch logic will go here
      const response = await fetch(`https://odev-l26v.onrender.com/products/${id}`)
      const result = await response.json();
      console.log(result);
      setSingleProduct(result);

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
  console.log(user?.type)

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
    <div className='single-prod-container'>
      <div>
        {showModal && <Modal token={token} setSingleProduct={singleProduct} singleProduct={singleProduct} onClose={() => {
          setShowModal(false);
          getSingleProduct();
        }} />}
        <button className='singeprod-button' onClick={() => {
          navigate("/products")
        }}>Go Back</button>
      </div>
      <div className='singleProdDiv' key={singleProduct.id}>

        <div><img className='singleProdImg' src={singleProduct.image_url}></img></div>
        <div className='prod-details'>
          <b>Item:</b><p>{singleProduct.name}</p>
          <b>Description:</b><p>{singleProduct.description}</p>
          <b>Price:</b><p>{singleProduct.price}</p>
          <b>#Tags</b><p>{singleProduct.product_tag}</p>
          <button className='singeprod-button' onClick={() => {

            checkOut(singleProduct.id);
            if (!token) {
              alert("Please login if you want to add item to cart!");
              navigate("/login");
            } else {
              alert("Product added to cart")
            }
          }}>Add to Cart</button>
          {
            adminUser() ? <button className='singeprod-button' onClick={() => {
              setShowModal(true)
            }}>Edit Product</button> : null}
        </div>
      </div>
    </div>
  )
}


export default SingleProduct