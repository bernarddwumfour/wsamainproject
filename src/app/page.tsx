import Image from "next/image";
import React from "react";
import Product from "./components/Product";
import Link from "next/link";

const page =async () => {

  let apiUrl = process.env.API_URL
  const getproducts = async () => {
    try{
      let res = await fetch(`${apiUrl}/api/shops/shopId/listings`, {
        cache: "no-store",
      });
      let data = await res.json();
      return data.listings;
    }catch(err){
      return []
    }
  };

  let products: product[] = await getproducts();

  return (
    <main>
      <div
        id="hero"
        className="bg-gray-400 py-[10rem] pt-[15rem] px-12 relative"
      >
        <Image
          src={"/hero.jpg"}
          alt="heroimage"
          className="object-cover brightness-50"
          fill
        />
        <div className="z-3 relative">
          <h1 className="text-6xl font-semibold  text-white">
            Discover Latest Trends
            <br /> in Fashion
          </h1>
          <p className="text-lg py-6  text-white text-[.9rem]">
            Shop the newest arrivals and exclusive collections. <br /> Elevate your
            style with our curated selection.
          </p>
          <Link href={"/products"} className="p-6 py-3 bg-red-400 inline-block  text-white">
            Shop Now
          </Link>
        </div>
      </div>

      <div id="menu" className="py-24 px-12 bg-white">
        <p className="text-red-400 font-lg">
          Discover the top-rated products everyone is talking about.
        </p>
        <h3 className="text-4xl pt-1 font-semibold pb-12 text-gray-600">
          Trending Now
        </h3>
        <div className="grid grid-cols-4 gap-6 ">
        {products && products.length>0 && products.map(product=>(<Product product={product} key={product.name}/>))}
        </div>
      </div>
    </main>
  );
};

export default page;
