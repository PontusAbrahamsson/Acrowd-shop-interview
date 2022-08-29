import CartRow from "../../componenets/cartRow/cartRow";
import { useEffect, useState } from "react";
import Button from "../../componenets/button/button";
import Link from "next/dist/client/link";

function Cart() {
  const [cart, setCart] = useState([]);
  const [removeProductID, setRemoveProductID] = useState(null);
  //Cart quantity number
  const [incrementCart, setIncrementCart] = useState();
  //Index of selected cart row
  const [selectedCartRow, setSelectedCartRow] = useState();

  //Edit products in cart
  useEffect(() => {
    //Finds product index of the selected row and increment or decrements
    for (var i = 0; i < cart.length; i++) {
      const cartCopy = [...cart]
      if (cart[i].productID === selectedCartRow) {

        cart[i].quantity = incrementCart

        setCart(cartCopy)
        const stringItem = JSON.stringify([...cart]);
        localStorage.setItem('cart', stringItem);
      }
    }
  }, [incrementCart, cart, selectedCartRow]);


  useEffect(() => {
    //Get products from cart
    const localCart = localStorage.getItem('cart');
    setCart(JSON.parse(localCart));

    //Remove product from cart
    if (removeProductID !== null) {
      const updatedCart = cart.filter((pruduct) => {
        return pruduct.productID !== removeProductID
      });
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      setRemoveProductID(null)
    };

  }, [removeProductID]);

  return (
    <div className="cart">
      <div className="cartTitleBox">
        <h1 className="cartTitle">Cart</h1>
      </div>

      <div className="tableWrapper">
        <table className="cartTable">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.map((product, index) => {

              return (
                <tr key={index} onClick={() => setSelectedCartRow(product.productID)}>
                  <CartRow
                    name={product.name}
                    price={product.price}
                    featuredImage={product.featuredImage}
                    productID={product.productID}
                    quantity={product.quantity}
                    setRemoveProductID={setRemoveProductID}
                    setIncrementCart={setIncrementCart}
                  />
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="devider"></div>
      <div className="btnContainer">
        <Link href='/checkout'>
          <a>
            <Button
              text={'Proceed to checkout'}
            />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Cart;