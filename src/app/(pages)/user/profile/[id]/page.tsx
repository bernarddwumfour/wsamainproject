import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className="bg-white min-h-screen py-24 pt-[9rem]">

        <h1 className="text-center font-3xl text-gray-600 text-2xl font-semibold">
            My Profile
        </h1>

        <div className="flex justify-center p-12 gap-6">
           <div className='p-12 w-1/3 rounded-lg shadow-lg bg-white '>

            <div className='mb-8'>
                <p className='text-[1.1rem] font-bold text-gray-600'>
                    Username
                </p>
                <p className='text-gray-500'>
                    Bernard
                </p>
            </div>

            <div className='mb-8'>
                <p className='text-[1.1rem] font-bold text-gray-600'>
                    Firstname
                </p>
                <p className='text-gray-500'>
                    Bernard
                </p>
            </div>

            <div className='mb-8'>
                <p className='text-[1.1rem] font-bold text-gray-600'>
                    Surname
                </p>
                <p className='text-gray-500'>
                    Bernard
                </p>
            </div>

           </div>

           
           <div className='p-12 w-1/3 rounded-lg shadow-lg bg-white '>

            <div className='mb-8'>
                <p className='text-[1.1rem] font-bold text-gray-600'>
                    Email
                </p>
                <p className='text-gray-500'>
                    Bernard
                </p>
            </div>

            <div className='mb-8'>
                <p className='text-[1.1rem] font-bold text-gray-600'>
                    Lastname
                </p>
                <p className='text-gray-500'>
                    Dwumfuor
                </p>
            </div>

            

            <Link href={'/user/dashboard/1'} className='text-gray-500'>View Order History</Link>

            <Link href={'/user/dashboard/1'} className='text-gray-500'>View Order History</Link>

            <Link href={'/user/dashboard/1'} className='text-gray-500'>View Order History</Link>

           </div>


        </div>



    </main>
  )
}

export default page