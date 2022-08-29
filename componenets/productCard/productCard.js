import Link from "next/link";
import Image from 'next/image'

function ProductCard({ name, price, salePrice, onSale, featuredImage, slug }) {

  return (
    <div className='productCard'>
      <Link href={`/product/${slug}`}>
        <a className="productLink"> </a>
      </Link>
      <div className='imageContainer'>
        <Image priority="true" layout="fill" className='imgCover' alt='Product image' src={featuredImage} />
      </div>
      <div className='informationContainer'>
        <div className='nameBox'>
          <h1 className='name'>{name}</h1>
        </div>
        <div className='priceBox'>
          <div className="price" dangerouslySetInnerHTML={{ __html: onSale === true ? salePrice : '$' + price }} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard;