import { useState, useEffect } from "react";

function CartRow({ name, price, featuredImage, productID, quantity, setRemoveProductID, setIncrementCart }) {
  const [quantityNumber, setQuantityNumber] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setTotalPrice((price * quantity) * 100 / 100)
  }, [quantity]);

  const decrementQuantity = () => {
    if (quantityNumber >= 2) {
      setQuantityNumber(quantityNumber - 1)
      setIncrementCart(quantityNumber - 1)
    }
  };

  const incrementQuantity = () => {
    setQuantityNumber(quantityNumber + 1)
    setIncrementCart(quantityNumber + 1)
  };


  return (
    <>

      <td>
        <div className="cartImgBox">
          <img className="imgCover" alt="cart image" src={featuredImage} />
        </div>
      </td>
      <td>
        <div className="nameBox">
          <h1 className="name">{name}</h1>
        </div>
      </td>
      <td>
        <h3 className="price">${price}</h3>
      </td>
      <td>
        <div className="incrementBtn">
          <div onClick={decrementQuantity} className="incrementIconBox">
            <svg className="incrementIcon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5.65 12.35v-.7h12.7v.7Z" /></svg>
          </div>
          <div className="incrementNumberBox">
            {quantityNumber}
          </div>
          <div onClick={incrementQuantity} className="incrementIconBox">
            <svg className="incrementIcon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11.65 18.35v-6h-6v-.7h6v-6h.7v6h6v.7h-6v6Z" /></svg>
          </div>
        </div>
      </td>
      <td>
        <h2 className="price">${parseFloat(totalPrice).toFixed(2)}</h2>
      </td>

      <td>
        <svg onClick={() => setRemoveProductID(productID)} className="deletIcon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m6.4 18.3-.7-.7 5.6-5.6-5.6-5.6.7-.7 5.6 5.6 5.6-5.6.7.7-5.6 5.6 5.6 5.6-.7.7-5.6-5.6Z" /></svg>
      </td>

    </>
  )
}

export default CartRow;