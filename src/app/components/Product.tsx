"use client"
import React, { useContext } from 'react'
import { FaCartPlus, FaStar } from "react-icons/fa6";
import { Appcontext } from '../../../context/AppContextProvider';
import Link from 'next/link';

type props = {
  product : product
}

const Product = ({product}: props) => {

  const {addtocart} = useContext(Appcontext)
  return (
    <div>
    <Link href={`/products/${product.id}`}>
    <div className="image bg-gray-200 h-[300px]"></div>
    </Link>
    <div className="details p-3 text-gray-700">
      <p className="font-semibold text-red-400">{product.name}</p>
      <p className="text-sm text-gray-400">{product.description}</p>
      <div className="flex gap-2 py-1">
        <span className="text-xl text-orange-300"><FaStar/></span>
        <span className="text-xl text-orange-300"><FaStar/></span>
        <span className="text-xl text-orange-300"><FaStar/></span>
        <span className="text-xl text-orange-300"><FaStar/></span>
        <span className="text-xl text-orange-300"><FaStar/></span>
      </div>
      <p className="text-gray-400 font-semibold">${product.price}</p>
      <div className="p-3 text-xl bg-red-400 rounded-full inline-block text-white" onClick={()=>addtocart(product)}> 
        <FaCartPlus/>
      </div>
    </div>
  </div>
  )
}

export default Product