import { useState, useEffect } from 'react';
import ProductCard from '../../../../componenets/productCard/productCard';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/router';


function Categories({ subCategoryId, products }) {
  const router = useRouter()

  return (
    <div className='shopWrapper'>
      <div className='shop'>

        <div className="goBackContainer">
          <h3 onClick={() => router.back()} className='goBack'>{'< Back'}</h3>
        </div>
        <div className='shopTitleContainer'>
          <h1 className='shopTitle'>{subCategoryId[0].name}</h1>
        </div>
        <nav className='navigationMenu'>
          <ul className='navUl'>
          </ul>
        </nav>

        <div className='productContainer'>
          {products?.map((product, index) => {

            if (product.status !== 'publish') {
              return null
            }

            return (
              <ProductCard
                key={index}
                name={product.name}
                salePrice={product.price_html}
                price={product.price}
                onSale={product.on_sale}
                featuredImage={product.images[0].src}
                slug={product.slug}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}



export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`)
  const { page } = context.query
  const { subCategory } = context.params

  const offset = Number(page * 8) - 8

  //Get subcategory
  const subCategoryRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products/categories?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&slug=${subCategory}`);
  const subCategoryId = await subCategoryRes.json();

  //Get products from subcategory
  const productsRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&orderby=id&per_page=${'8'}&offset=${page !== undefined ? offset : 0}&category=${subCategoryId[0].id}`);
  const products = await productsRes.json();

  return {
    props: {
      subCategoryId,
      products,
    }
  }
}

export default Categories;