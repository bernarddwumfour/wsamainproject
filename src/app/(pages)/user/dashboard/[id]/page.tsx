"use client";
import { Order } from "@/app/components/types";
import axios from "axios";
import React, {useState, useEffect} from "react";



const Page = ({ userId=0 }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = process.env.NEXT_PUBLIC_ORDERMANAGEMENT_API_URL;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>(`https://localhost:7093/api/Orders`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  });

  if (loading) {
    return <div>Loading...</div>;
  }
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
              <thead className="bg-gray-500 text-white">
                <td className="p-1 px-4 font-semiboldn ">Order id</td>
                <td className="p-1 px-4 font-semiboldn ">Date</td>
                <td className="p-1 px-4 font-semiboldn ">Status</td>
                <td className="p-1 px-4 font-semiboldn ">Total Amount</td>
              </thead>
              <tbody>
                {orders.map((order)=>(
                  <tr key={order.orderID} className="mb-2">
                  <td className="p-1 px-4 font-semiboldn ">{order.orderID}</td>
                  <td className="p-1 px-4 font-semiboldn ">{order.orderPlaced}</td>
                  <td className="p-1 px-4 font-semiboldn ">{order.status}</td>
                  <td className="p-1 px-4 font-semiboldn ">{order.totalAmount}</td>
                </tr>
                ))}
                
                              
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
