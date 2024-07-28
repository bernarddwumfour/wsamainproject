import Product from '@/app/components/Product'
import React from 'react'

const page =async () => {

  let apiUrl = process.env.API_URL

    const getproducts = async ()=>{
        let res = await fetch(`${apiUrl}/api/shops/shopId/listings`,{cache : "no-store"})
        let data = await res.json()
        return data.listings
    }
    
    let products:product[] = await getproducts()

  return (
    <div id="menu" className="py-24 px-12 bg-white">
    <h3 className="text-3xl px-6 font-semibold py-12 text-gray-600">
      Lorem ipsum dolor sit amet.
    </h3>
    <div className="grid grid-cols-4 gap-6 ">
      {products && products.length>0 && products.map(product=>(<Product key={product.name} product={product}/>))}
    </div>
  </div>
  )
}

export default page