
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import Cart from './Cart'
import Navicons from './Navicons'
import Link from 'next/link'
import Pagemessage from './Pagemessage'

const Header = () => {
  return (
   <>
   {/* <div className='p-3 flex justify-center bg-red-400'>
    <ul className='flex gap-4 justify-center text-sm'>
        <a href="tel:+">+233592724408</a>
        <a href="tel:+">+233592724408</a>
    </ul>
   </div> */}
    <nav className='p-4 shadow-lg pt-6 z-[10] flex justify-between bg-white text-gray-600 items-end fixed top-0 left-0 w-[100%]'>
        <Link href="/" className="logo text-2xl uppercase self-center">logo</Link>

        <ul className='flex gap-4'>
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/products">Products</Link>
        </ul>

        <div className='flex border-gray-200 border-2 bg-white shadow-sm'>
            <span className='bg-gray-600 text-white  px-4  flex items-center'>
                <FaSearch/>
            </span>
            <input className='p-2 border-gray-400 outline-none items-center w-[40vw]' type="text" name="search" placeholder='Search' id="search" />
        </div>

        <Navicons/>
        
        <Pagemessage/>

    </nav>

   </>
  )
}

export default Header