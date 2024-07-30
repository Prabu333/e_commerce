import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({data}) => {
  return (
    <>
    {
      data?.map(function(item, index) {
        return(
        <ProductCard item={item} key={index}/>
        )
      })
    }
    
    </>
  )
}

export default ProductList