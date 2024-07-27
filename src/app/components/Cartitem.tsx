import React, { useContext, useState } from "react";
import { FaAngleLeft, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { Appcontext } from "../../../context/AppContextProvider";

type props = {
  product: product;
};

const Cartitem = ({ product }: props) => {
  const [count, setcount] = useState(1);
  const {deletefromcart} = useContext(Appcontext)

  const increase = () => {
    if (count <= 10) {
      setcount(count + 1);
    }
  };

  const decrease = () => {
    if (count > 1) {
      setcount(count - 1);
    }
  };

  return (
    <div className="flex justify-between gap-2 p-2">
      <div className="image w-[100px] h-[100px] bg-gray-200"></div>
      <div className="details p-3 text-gray-700 leading-[.95rem] w-[160px]">
        <p className="font-semibold text-[.9rem] text-red-400">
          {product.name}
        </p>
        <p className="text-sm text-gray-400 pb-1">Quantity: {count}</p>
        <p className="text-gray-400 font-semibold text-[.9rem]">
          ${product.price}
        </p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex gap-2">
          <span
            className="bg-gray-500 rounded-full p-1 text-sm text-white"
            onClick={increase}
          >
            <FaPlus />
          </span>
          <p className="text-sm text-gray-600 pb-1"> {count}</p>
          <span
            className="bg-gray-500 rounded-full p-1 text-sm text-white"
            onClick={decrease}
          >
            <FaMinus />
          </span>
        </div>

        <span className="text-red-500 text" onClick={()=>deletefromcart(product)}>
          <FaTrash />
        </span>
      </div>
    </div>
  );
};

export default Cartitem;
