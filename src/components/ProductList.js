import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filter_product:products,  grid_View} = useFilterContext();
  if(products.length <1){
    return (<h5 style={{textTrasnsform : 'none'}}>sorry, no product match your search</h5>)
  }
  if(!grid_View){
    return <ListView products = {products}/>
  }
  return <GridView products = {products}/>
}

export default ProductList
