import { useEffect, useState } from "react";
import Link from "next/dist/client/link";

function Header() {
  const [cartQuantity, setCartQuantity] = useState();

  if (typeof window !== 'undefined') {

    useEffect(() => {
      //Get products from cart
      const getLocalCart = localStorage.getItem('cart');
      setCartQuantity(JSON.parse(getLocalCart));
    }, [localStorage.getItem('cart')])
  }

  return (
    <header>

      <div className="logoContainer">
        <Link href="/">
          <a>
            <h1 className="logo">Acrowd</h1>
          </a>
        </Link>
      </div>

      <nav className="navBar">
        <Link href="/shop">
          <a>
            <h4 className="navItem">Shop</h4 >
          </a>
        </Link>
        <Link href="/shop/men">
          <a>
            <h4 className="navItem">Men</h4>
          </a>
        </Link>
        <Link href="/shop/women">
          <a>
            <h4 className="navItem">Women</h4>
          </a>
        </Link>
      </nav>

      <div className="cartContainer">
        {cartQuantity && cartQuantity.length !== 0 ?
          <Link href="/cart">
            <a >
              <div className="cartCircle">
                <h5 className="cartQuantity">{cartQuantity?.length}</h5>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M10.75 35q-1 0-1.708-.708-.709-.709-.709-1.709v-18.5q0-1 .709-1.708.708-.708 1.708-.708h3.542v-.959q0-2.375 1.666-4.041Q17.625 5 20 5t4.042 1.667q1.666 1.666 1.666 4.041v.959h3.542q1 0 1.708.708.709.708.709 1.708v18.5q0 1-.709 1.709Q30.25 35 29.25 35Zm0-1.417h18.5q.375 0 .688-.312.312-.313.312-.688v-18.5q0-.375-.312-.687-.313-.313-.688-.313h-3.542v4.292q0 .292-.208.5-.208.208-.5.208-.292 0-.5-.208-.208-.208-.208-.5v-4.292h-8.584v4.292q0 .292-.208.5-.208.208-.5.208-.292 0-.5-.208-.208-.208-.208-.5v-4.292H10.75q-.375 0-.688.313-.312.312-.312.687v18.5q0 .375.312.688.313.312.688.312Zm4.958-21.916h8.584v-.959q0-1.833-1.23-3.062Q21.833 6.417 20 6.417q-1.833 0-3.062 1.229-1.23 1.229-1.23 3.062ZM9.75 33.583v-20.5 20.5Z" /></svg>
            </a>
          </Link>
          :
          <Link href="/cart">
            <a >
              <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M10.75 35q-1 0-1.708-.708-.709-.709-.709-1.709v-18.5q0-1 .709-1.708.708-.708 1.708-.708h3.542v-.959q0-2.375 1.666-4.041Q17.625 5 20 5t4.042 1.667q1.666 1.666 1.666 4.041v.959h3.542q1 0 1.708.708.709.708.709 1.708v18.5q0 1-.709 1.709Q30.25 35 29.25 35Zm0-1.417h18.5q.375 0 .688-.312.312-.313.312-.688v-18.5q0-.375-.312-.687-.313-.313-.688-.313h-3.542v4.292q0 .292-.208.5-.208.208-.5.208-.292 0-.5-.208-.208-.208-.208-.5v-4.292h-8.584v4.292q0 .292-.208.5-.208.208-.5.208-.292 0-.5-.208-.208-.208-.208-.5v-4.292H10.75q-.375 0-.688.313-.312.312-.312.687v18.5q0 .375.312.688.313.312.688.312Zm4.958-21.916h8.584v-.959q0-1.833-1.23-3.062Q21.833 6.417 20 6.417q-1.833 0-3.062 1.229-1.23 1.229-1.23 3.062ZM9.75 33.583v-20.5 20.5Z" /></svg>
            </a>
          </Link>
        }

      </div>

    </header>
  )
}

export default Header;