"use client"
import React, { useContext } from 'react'
import { FaCartShopping, FaRightToBracket, FaUser } from 'react-icons/fa6'
import Cart from './Cart'
import { Appcontext } from '../../../context/AppContextProvider'
import Link from 'next/link'
import { FaUserAlt } from 'react-icons/fa'



const Navicons = () => {
const {togglecart,cart} = useContext(Appcontext)

  return (
    <ul className='flex gap-8 pr-12 text-gray-500 text-xl'>
            <span onClick={togglecart} className='relative'>
                <sup className='absolute -top-2 -right-2 p-1 py-0 rounded-full  bg-red-400 '>{cart.length}</sup>
                <FaCartShopping/>
            </span>

            <Link href="/login">
                <FaRightToBracket/>
            </Link>
            

            <Link href="/user/profile/1">
                <FaUserAlt/>
            </Link>


            <Cart
            />
        </ul>
  )
}

export default Navicons