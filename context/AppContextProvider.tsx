"use client";
import React, { createContext, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

type context = {
  cartopen: boolean;
  togglecart: () => void;
  addtocart: (product: product) => void;
  deletefromcart: (product: product) => void;
  cart: product[];
  pagemessage: string;
  pagemessagestate: Boolean;
  pagemessagetype: string;
  showpagemessage: (
    message: string,
    type: "info" | "success" | "error"
  ) => void;
};

export const Appcontext = createContext<context>({
  cartopen: true,
  togglecart: () => {},
  addtocart: (product: product) => {},
  deletefromcart: (product: product) => {},
  cart: [],
  pagemessage: "",
  pagemessagetype: "",
  pagemessagestate: false,
  showpagemessage: () => {},
});

const AppContextProvider = ({ children }: Props) => {
  const [cartopen, setcartopen] = useState(false);
  const [cart, setcart] = useState<product[]>([]);

  const addtocart = (product: product) => {
    let check = cart.filter((cartproduct) => cartproduct.id == product.id);
    if (check.length == 0) {
      setcart((prev) => [product, ...prev]);
        showpagemessage( `${product.name} added to cart`,"info")
    } else {
        showpagemessage("Product already In cart",'error')
    }
    console.log(cart);
  };

  const deletefromcart = (cartproduct: product) => {
    let newcart = cart.filter((product) => product.id != cartproduct.id);
    setcart(newcart);
    showpagemessage(`${cartproduct.name} deleted from cart`, "info");
  };

  const togglethecart = () => {
    setcartopen((prev) => !prev);
  };

  const [pagemessage, setpagemessage] = useState("");
  const [pagemessagestate, setpagemessagestate] = useState(false);
  const [pagemessagetype, setpagemessagetype] = useState("info");

  const showpagemessage = (message: string, type: string) => {
    setpagemessage(message);
    setpagemessagestate(true);
    setpagemessagetype(type);
    setTimeout(() => {
      setpagemessagestate(false);
      setpagemessage("");
    }, 3000);
  };

  return (
    <Appcontext.Provider
      value={{
        cartopen,
        togglecart: togglethecart,
        addtocart,
        deletefromcart,
        cart,
        pagemessage: pagemessage,
        pagemessagestate: pagemessagestate,
        pagemessagetype: pagemessagetype,
        showpagemessage,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
