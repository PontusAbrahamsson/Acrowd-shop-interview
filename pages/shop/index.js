import React from 'react';
import Link from 'next/dist/client/link';
import ProductCard from '../../componenets/productCard/productCard';
import Button from '../../componenets/button/button';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

function Shop({ productsData, parentCategories, productLength }) {
  const router = useRouter()
  const { page } = router.query

  const paginatedPages = Math.ceil(productLength / 8.0)

  for (var i = 0; i < parentCategories.length; i++) {
    if (parentCategories[i].slug === 'uncategorized') {
      parentCategories.splice(i, 1)
    }
  };

  return (
    <div className='shopWrapper'>
      <div className='shop'>
        <div className='shopTitleContainer'>
          <h1 className='shopTitle' style={{ marginTop: '79px' }}>Shop</h1>
        </div>
        <nav className='navigationMenu'>
          <ul className='navUl'>
            {parentCategories.map((parentCategory, index) => {

              return (
                <Link key={index} href={`/shop/${parentCategory.slug}`}>
                  <a>
                    <li >
                      <h2 className='navItem'> {parentCategory.name}</h2>
                    </li>
                  </a>
                </Link>
              )
            })}
          </ul>
        </nav>

        <div className='productContainer'>
          {productsData.map((product, index) => {

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
        <div className='btnContainer' >
          {page !== undefined && page >= 2 &&
            <Link href={`?page=${Number(page) - 1}`}>
              <a>
                <span>{'< Prev'}</span>
              </a>
            </Link>
          }
          {page != paginatedPages &&
            <Link href={`?page=${page === undefined ? Number(2) : Number(page) + 1}`}>
              <a>
                <div>{'Next >'}</div>
              </a>
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`)
  const { page } = context.query
  const offset = Number(page * 8) - 8

  //Get first page of products
  const productsRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&orderby=id&per_page=8&offset=${page !== undefined ? offset : 0}`);
  const productsData = await productsRes.json();

  //Get all parent categories
  const parentCategoriesRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products/categories?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&parent=0`);
  const parentCategories = await parentCategoriesRes.json();

  //Get all products to calculate length for pagination
  const allProductsRes = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}&per_page=100`);
  const productsLength = await allProductsRes.json();


  return {
    props: {
      productsData,
      parentCategories,
      'productLength': productsLength.length
    }
  }
}

export default Shop;