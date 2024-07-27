import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main>
      <div className="flex justify-center w-full px-2 lg:px-12 py-24 lg:py-48 bg-white">
        <form className="flex flex-col items-center w-full max-w-xl shadow-lg bg-white rounded-lg">
            <p className="text-center text-red-400 font-bold  text-lg">Login To My Account</p>
          <div className="flex flex-col gap-6 w-full justify-center px-4 py-8">
            <div className="control w-full flex flex-col-reverse gap-2 relative">
              <input
                type="text"
                className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-orange-200"
                name="email"
                id="email"
              />
              <label htmlFor="email" className="text-gray-500">
                Email
              </label>
            </div>

            <div className="control w-full flex flex-col-reverse gap-2 relative">
              <input
                type="text"
                className="p-2 border-gray-300 border-2 outline-none w-full block focus:border-orange-200"
                name="password"
                id="password"
              />
              <label htmlFor="password" className="text-gray-500">
                Password
              </label>
            </div>
          </div>
          <button className="p-3 px-6 bg-red-400 text-white text-sm w-fit inline-block border-none outline-none">
            Login
          </button>
          <p className="text-gray-600 text-sm text-left py-8">Dont have an account? <Link className="text-red-400 underline" href={"/signup"}>Create one Here</Link></p>
        </form>
      </div>
    </main>
  );
};

export default page;
