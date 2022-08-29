import { useEffect, useState } from "react";
import Button from "../../componenets/button/button";
import ProductCard from "../../componenets/productCard/productCard";
import Image from "next/image";

function SingleProduct({ singleProduct, relatedProducts }) {
  const [quantityNumber, setQuantityNumber] = useState(1);
  const [cart, setCart] = useState([]);
  const [featuredImage, setFeaturedImage] = useState('');

  //Reset featured image 
  useEffect(() => {
    setFeaturedImage('')
  }, [])

  useEffect(() => {
    //Get products from cart so we can see if product already exists
    const localCart = localStorage.getItem('cart');
    setCart(JSON.parse(localCart));
  }, []);

  //Add product to cart
  const addToCart = ({ name, price, featuredImage, productID, quantity }) => {
    const newProduct = []
    newProduct.push({ name, price, featuredImage, productID, quantity });
    const existingItem = cart.find(product => product.productID == newProduct[0].productID)

    //If product already exists in cart increment quantity else add product
    if (existingItem) {

      //Finds the array index which id is equal to exsisting product, then increments the quantity with 1
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].productID === existingItem.productID) {
          cart[i].quantity += 1
        }
      }
      const stringItem = JSON.stringify([...cart]);
      localStorage.setItem('cart', stringItem);
    } else {
      setCart([...cart, ...newProduct]);
      //Push new product to localstorage
      const stringItem = JSON.stringify([...cart, ...newProduct]);
      localStorage.setItem('cart', stringItem);
    }
  };

  useEffect(() => {
    //Make sale price opacity: 0.5
    document.getElementsByClassName('woocommerce-Price-amount')[0].style.opacity = '0.5';
    document.getElementsByClassName('shortDescription')[0].innerHTML = singleProduct[0].short_description;
  }, [singleProduct]);

  const decrementQuantity = () => {
    if (quantityNumber >= 2) {
      setQuantityNumber(quantityNumber - 1)
    }
  };

  const incrementQuantity = () => {
    setQuantityNumber(quantityNumber + 1)
  };

  return (
    <div className="singleProduct">
      <div className="productInfoContainer">
        <div className="imagesContainer">
          <div className="featuredImgBox">
            <Image layout="fill" priority="true" className="imgCover" src={featuredImage.length <= 0 ? singleProduct[0].images[0].src : featuredImage} alt="Product image" />
          </div>
          <div className="imageGalleryContainer">
            {singleProduct[0].images.map((image, index) => {

              return (
                <div key={index} className="galleryImgBox" onClick={() => setFeaturedImage(image.src)} >
                  <Image layout="fill" priority="true" className="imgCover" src={image.src} alt="Product variation image" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="infoBox">
          <div className="breadcrumbsBox">
            <h3 className="breadcrumbs">Shop / {`${singleProduct[0].categories[1] ? `${singleProduct[0].categories[1].name} /` : ''}`}  {singleProduct[0].categories[0].name}</h3>
          </div>
          <div className="nameBox">
            <h1 className="name">{singleProduct[0].name}</h1>
          </div>
          <div className="priceBox">
            <div className="price" dangerouslySetInnerHTML={{ __html: singleProduct[0].price_html }} />
          </div>
          <div className="shortDescriptionBox">
            <p className="shortDescription"></p>
          </div>
          <div className="cartBtnBox">
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
            <div onClick={() => addToCart
              ({
                'name': singleProduct[0]?.name,
                'price': singleProduct[0]?.price,
                'featuredImage': singleProduct[0]?.images[0].src,
                'productID': singleProduct[0]?.id ?? 0,
                'quantity': quantityNumber
              })}>
              <Button
                text="add to cart" />
            </div>
          </div>
        </div>
      </div>

      <div className="relatedProductsContainer">
        <h2 className="title">Related Products</h2>
        <div className="relatedProductsRow">
          {relatedProducts.map((product, index) => {

            return (
              <div className='product' key={index} onClick={() => setFeaturedImage('')}>
                <ProductCard
                  index={index}
                  name={product.name}
                  salePrice={product.price_html}
                  price={product.price}
                  onSale={product.on_sale}
                  featuredImage={product.images[0].src}
                  slug={product.slug}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
};

export async function getStaticPaths() {

  //Get all products
  const singleProductRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&per_page=100`);
  const singleProduct = await singleProductRes.json();

  return {
    paths: singleProduct.map(product => {
      return {
        params: {
          productSlug: product.slug.toString()
        }
      }
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { productSlug } = params

  //Get single product
  const singleProductRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&slug=${productSlug}}`);
  const singleProduct = await singleProductRes.json();

  //Get related products
  const relatedProductsRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&include=${singleProduct[0].related_ids}`);
  const relatedProducts = await relatedProductsRes.json();

  return {
    props: {
      singleProduct,
      relatedProducts
    },
    revalidate: 30,
  }
}

export default SingleProduct;