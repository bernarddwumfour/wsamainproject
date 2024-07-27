"use client";
import React, { useContext } from "react";
import { Appcontext } from "../../../context/AppContextProvider";

const Pagemessage = () => {
  const { pagemessage, pagemessagestate, pagemessagetype } =
    useContext(Appcontext);

  return (
    <div className={`${pagemessagestate? "block" : "hidden"} fixed top-28 left-1/2 -translate-x-1/2 w-max p-3 ${pagemessagetype == "info" &&"text-red-400"}  ${pagemessagetype == "success" &&"text-green-600"} ${pagemessagetype == "error" &&"text-red-600"} z-[20] bg-white rounded-lg px-10 font-semibold shadow-lg`}>
      {pagemessage}
    </div>
  );
};

export default Pagemessage;
