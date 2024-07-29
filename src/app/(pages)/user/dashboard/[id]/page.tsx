import React from "react";

const page = () => {
  return (
    <main className="bg-white min-h-screen py-24 pt-[9rem]">
      <h1 className="text-center font-3xl text-gray-600 text-2xl font-semibold">
        My Dashboard
      </h1>

      <div className="px-32">
        <div className="flex gap-10 justify-start py-12">
          <div className="menu p-6 flex flex-col gap-4 shadow-lg rounded-lg pe-16 text-gray-600 h-fit">
            <span>All Orders</span>
            <span>Current orders</span>
            <span>Past orders</span>
          </div>

          <div className="main p-6 flex flex-col gap-4  shadow-lg rounded-lg text-gray-600 h-fit">
            <table>
              <thead className="bg-red-300 text-white">
                <td className="p-1 px-4 font-semiboldn ">Order id</td>
                <td className="p-1 px-4 font-semiboldn ">Date</td>
                <td className="p-1 px-4 font-semiboldn ">Items Ordered</td>
                <td className="p-1 px-4 font-semiboldn ">Status</td>
              </thead>
              <tbody>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
                <tr className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">1000111</td>
                  <td className="p-1 px-4 font-semiboldn ">22/09/2000</td>
                  <td className="p-1 px-4 font-semiboldn ">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                  <td className="p-1 px-4 font-semiboldn ">Delivered</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
