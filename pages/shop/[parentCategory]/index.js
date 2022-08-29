import { useState, useEffect } from 'react';
import ProductCard from '../../../componenets/productCard/productCard';
import Link from 'next/dist/client/link';
import Button from '../../../componenets/button/button';
import { useRouter } from 'next/router';


function Categories({ products, subCategories, parentCategoriesId }) {
  const router = useRouter()

  return (
    <div className='shopWrapper'>
      <div className='shop'>

        <div className="goBackContainer">
          <h3 onClick={() => router.back()} className='goBack'>{'< Back'}</h3>
        </div>
        <div className='shopTitleContainer'>
          <h1 className='shopTitle'>{parentCategoriesId[0].name}</h1>
        </div>
        <nav className='navigationMenu'>
          <ul className='navUl'>
            {subCategories.map((subCategory, index) => {

              return (
                <Link key={index} href={`/shop/${parentCategoriesId[0].slug}/${subCategory.slug}`}>
                  <a>
                    <li >
                      <h2 className='navItem'>{subCategory.name}</h2>
                    </li>
                  </a>
                </Link>
              )
            })}
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
  const { parentCategory } = context.params

  const offset = Number(page * 8) - 8

  //Get parent category
  const parentCategoriesRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products/categories?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&parent=0&slug=${parentCategory}`);
  const parentCategoriesId = await parentCategoriesRes.json();

  //Get all the products
  const productsRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&orderby=id&per_page=${'8'}&offset=${page !== undefined ? offset : 0}&category=${parentCategoriesId[0].id}`);
  const products = await productsRes.json();

  //Get sub categories
  const subCategoriesRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products/categories?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&parent=${parentCategoriesId[0].id}`);
  const subCategories = await subCategoriesRes.json();

  return {
    props: {
      products,
      subCategories,
      parentCategoriesId
    }
  }
}

export default Categories;