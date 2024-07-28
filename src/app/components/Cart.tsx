"use client"
import React, { useContext } from 'react'
import Cartitem from './Cartitem'
import { Appcontext } from '../../../context/AppContextProvider'
import Link from 'next/link'

const Cart = () => {
  const {cartopen,cart} = useContext(Appcontext)
  return (
    <div className={`${cartopen?"block":"hidden"} absolute py-2 bg-white top-24 p-1  right-12 shadow-lg`}>
        <p className='text-center font-semibold text-[1rem] p-2'>Products  In Cart</p>
        {cart && cart.length>0 && cart.map(product=>(<Cartitem key={product.id} product={product}/>))}
        {cart && cart.length<1 && <p className='text-[.95rem] p-6 px-10'>No products in cart</p>}
        <Link href="/checkout"><div className="text-center bg-gray-600 text-white p-2 text-[1rem] rounded-sm mt-4">Go To CheckOut</div></Link>
    </div>
  )
}

export default Cart