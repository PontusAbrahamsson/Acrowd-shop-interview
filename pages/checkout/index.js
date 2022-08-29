import { useState, useEffect } from "react";
import Input from "../../componenets/input/input";
import Button from "../../componenets/button/button";
import axios from "axios";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState();
  const [orderError, setOrderError] = useState();
  const [pending, setPending] = useState(false);
  const [totalPrice, setTotalPrice] = useState();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkoutItems, setCheckoutItems] = useState();

  const [emailErr, setEmailErr] = useState('');
  const [firstNameErr, setFirstNameErr] = useState('');
  const [lastNameErr, setLastNameErr] = useState('');

  //Get products from cart
  useEffect(() => {
    const localCart = localStorage.getItem('cart');
    setCart(JSON.parse(localCart));
  }, []);

  //Get total price
  useEffect(() => {
    //Push all product prices to priceArr
    const priceArr = []
    for (var i = 0; i < cart.length; i++) {
      priceArr.push(cart[i].price * cart[i].quantity)
    }
    //Add all price values together
    setTotalPrice(priceArr.reduce((total, num) => total + num, 0))


    //Checkout
    const checkoutItems = cart.map(product => {
      return {
        'product_id': product.productID,
        'quantity': product.quantity
      }
    });
    setCheckoutItems(checkoutItems)
  }, [cart]);



  //Function that checks if email is valid
  function checkIfValidEmail(str) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    return re.test(str);
  }

  async function processOrder() {
    //Checks that email is valid & first, last name is not emty
    if (checkIfValidEmail(email) === false) {
      setEmailErr('Invalid email')
    } else {
      setEmailErr('')
    }

    if (firstName.length <= 0) {
      setFirstNameErr('Please enter your first name')
    } else {
      setFirstNameErr('')
    }

    if (lastName.length <= 0) {
      setLastNameErr('Please enter your last name')
    } else {
      setLastNameErr('')
    }

    if (checkIfValidEmail(email) === true && firstName.length > 0 && lastName.length > 0) {
      console.log('submitted')
      const orderData = {
        set_paid: true,
        billing: {
          email: email,
          first_name: firstName,
          last_name: lastName
        },
        line_items: checkoutItems
      };

      await axios
        .post(
          `https://shop-interview.acrowd.se/wp-json/wc/v3/orders?consumer_key=ck_4c0d8a4f83c78831c200e39d1f371e92d419d863&consumer_secret=cs_1eb6c96b9a32942b52a868da3ad28698b15873ff`,
          orderData,
        )
        .then(response => {
          console.log('Process order', response)
          setPending(true)
          setOrder(response.data)
          return response
        })
        .catch(err => {
          console.log('Order error: ', err)
          setOrderError(err)
        })
    }
  }


  return (
    <div className="checkout">
      <div className="checkoutTitleBox">
        <h1 className="checkoutTitle">Cart</h1>
      </div>
      <div className="inptContainer">
        <Input
          type='email'
          id='email'
          inputTitle="Email *"
          placeHolder='email@example.com'
          useState={setEmail}
          value={email}
          errMsg={emailErr}
          name='email'
        />
        <div className="flex">
          <div className="flexBox">
            <Input
              type='text'
              id='firstName'
              inputTitle="First name *"
              placeHolder='John'
              useState={setFirstName}
              value={firstName}
              errMsg={firstNameErr}
              name='firstName'
            />
          </div>
          <div className="flexBox">
            <Input
              type='text'
              id='lastName'
              inputTitle="Last name *"
              placeHolder='Doe'
              useState={setLastName}
              value={lastName}
              errMsg={lastNameErr}
              name='lastName'
            />
          </div>
        </div>
      </div>
      <div className="checkoutContainer">
        <div className="checkoutTable">
          <h4 className="checkoutItem">Product</h4>
          <h4 className="checkoutItem">Total</h4>
        </div>
        <ul className="productList">

          {cart.map((product, index) => {

            return (
              <li className="productItem" key={index}>
                <div className="nameBox">
                  <h3 className="name">{product.name} x <b>{product.quantity}</b></h3>
                </div>
                <h3 className="price">${(product.price * product.quantity) * 100 / 100}</h3>
              </li>
            )
          })}

          <li className="productItem">
            <div className="nameBox">
              <h3 className="totalName"><b>Total</b></h3>
            </div>
            <h3 className="totalPrice"><b>${parseFloat(totalPrice).toFixed(2)}</b></h3>
          </li>

        </ul>
      </div>
      <div className="submitBtnContainer" onClick={processOrder}>
        <Button text='Confirm Purchase' />
      </div>
    </div >
  )
}

export default Checkout;