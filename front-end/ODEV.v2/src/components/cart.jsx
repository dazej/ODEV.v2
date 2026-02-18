import { useState, useEffect } from "react";


export default function Cart({ token, user, cartProd, setCartProd }) {

  // const [cartProd, setCartProd] = useState(null);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [cartAmount, setCartAmount] = useState([]);
  // const navigate = useNavigate()


  // const [purchasedProducts, setPurchasedProducts] = useState([]);


  useEffect(() => {
    getCart();
  }, [token, user]);


  async function checkCart(id, quantity) {
    console.log(id)
    await getPurchasedProducts()
    for (let i = 0; i < purchasedProducts.length; i++) {
      console.log(id)
      console.log(purchasedProducts[i])
      if (id == purchasedProducts[i].productId) {
        console.log('got here too')
        await updateOrderQuantity(id, purchasedProducts[i].quantity, purchasedProducts[i].id)
        return true
      }
    }
    await checkOut(id, quantity)

  }



  async function getCart() {
    try {
      const response = await fetch(`https://odev-l26v.onrender.com/cart/users/${user?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
      const data = await response.json();
      setCartData(data)
      console.log(data)
      const products = await Promise.all(data.map(async (cart) => {
        const cartProds = await fetch(`https://odev-l26v.onrender.com/products/${cart?.productId}`, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        const productData = await cartProds.json();
        cart.products = productData;
        return cart;
      }));
      products.sort((a, b) => a.productId - b.productId)
      setCartAmount(products);
      setCartProd(products);
    } catch (error) {
      console.error(error);
    }
  }




  useEffect(() => {
    getPurchasedProducts()
  }, [token, user])

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

      setPurchasedProducts(data)

    } catch (error) {
      console.error(error);
    };
  }


  console.log(purchasedProducts)





  async function deleteCartItem(id) {
    try {
      const response = await fetch(`https://odev-l26v.onrender.com/cart/${id}`, {
        method: "DELETE",
        headers:
        {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      const result = await response.json()
      console.log(result);
      getCart()
    } catch (err) {
      console.error(
        err
      );
    }
  }

  async function updateQuantity(id, quantity) {
    try {
      const response = await fetch(`https://odev-l26v.onrender.com/cart/${id}`, {
        method: "PATCH",
        headers:
        {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      })
      const result = await response.json()
      console.log(result);
      getCart()
    } catch (err) {
      console.error(
        err
      );
    }

  }

  async function updateOrderQuantity(id, quantity, orderId) {
    try {
      const response = await fetch(`https://odev-l26v.onrender.com/orders/${orderId}`, {
        method: "PATCH",
        headers:
        {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(
          { quantity: quantity + 1 }
        )
      })
      const result = await response.json()
      console.log(result);
      getPurchasedProducts()
    } catch (err) {
      console.error(
        err
      );
    }

  }

  async function checkOut(id, quantity) {

    try {

      const userId = user.id;


      const response = await fetch(`https://odev-l26v.onrender.com/orders/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          productId: id,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      getPurchasedProducts()

      console.log("Product ordered:", data);
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  }

  const totalProds = cartData.reduce((cart, product) => {
    return cart + product.quantity;
  }, 0);
  const totalAmount = cartAmount.reduce((cart, product) => {
    return cart + product.products.price * product.quantity;
  }, 0);




  return (
    <>
      <div className="cart-container">
        <div className="cart-items">
          {cartProd && cartProd.map((cart) => (
            <div id="cart" key={cart.products.id}>
              <p> {cart.products.name}</p>
              <img src={cart.products.image_url} alt="image" width="100" height="100" />
              <p>
                Quantity:
                <button id="quantity-button" onClick={() => updateQuantity(cart.id, cart.quantity - 1)}>-</button>
                {cart.quantity}
                <button id="quantity-button" onClick={() => updateQuantity(cart.id, cart.quantity + 1)}>+</button>
              </p>
              <br />
              <button id="cart-button" onClick={() => deleteCartItem(cart.id)}>Remove From Cart</button>
              <br />
              <button id="cart-button" onClick={(event) => { event.preventDefault(); checkCart(cart.productId, cart.quantity); deleteCartItem(cart.id) }}>Purchase</button>
            </div>
          ))}
        </div>
        <div id="cart-details">
          <p>Total Items in Cart:{totalProds}</p>
          <p>Total Amount: ${totalAmount}</p>
        </div>

      </div>
    </>
  );
}