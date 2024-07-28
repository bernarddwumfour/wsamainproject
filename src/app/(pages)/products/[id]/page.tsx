import React from 'react'

const page =async ({params}:{ params: { id: string } }) => {

  let apiUrl = process.env.API_URL

    const getproduct = async () => {

        try{
          let res = await fetch(`${apiUrl}/api/listings/${params.id}`, {
            cache: "no-store",
          });
          let data = await res.json();
          return data.listing;
        }catch(err){
          return []
        }
      };
    
      let product: product = await getproduct();
      console.log(product)

  return (
    <main className="pt-32 bg-white min-h-screen">
    <div className="product flex justify-center lg:flex-row flex-col lg:px-12 p-2 gap-12 items-center">
      <div className="image bg-gray-200 sm:h-[500px] h-[300px] relative lg:w-1/2 w-full max-w-[700px]">
       
      </div>
      <div className="details p-4 lg:w-1/2">
        <p className="uppercase text-red-400 font-semibold">
          {product && product.name}
        </p>
        <p className="text-sm text-gray-600 py-2">
          {product && product.description}
        </p>
        <div className="flex flex-col gap-3">
          <p className="text-gray-700">${product && product.price}</p>
          <span>
          </span>
        </div>
      </div>
    </div>
   
  </main>
  )
}

export default page