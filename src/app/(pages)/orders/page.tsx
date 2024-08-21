"use client";
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Order } from '../../components/types';

interface OrdersPageProps {
  userId: number;
}

const Page: React.FC<OrdersPageProps> = ({userId=123}) => {
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
    <div className="container mx-auto p-8 bg-gray-100">
  <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Past Orders</h1>
    {orders.length === 0 ? (
      <p className="text-gray-600">No past orders found.</p>
    ) : (
      <ul>
        {orders.map((order) => (
          <li key={order.orderID} className="border-l-4 border-gray-300 p-4 mb-6 bg-gray-50 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Order ID: {order.orderID}</h2>
            <p className="text-gray-600 mb-1">Order Placed: {new Date(order.orderPlaced).toLocaleString()}</p>
            <p className="text-gray-600 mb-1">
              Order Fulfilled: {order.orderFulfilled ? new Date(order.orderFulfilled).toLocaleString() : 'Not fulfilled yet'}
            </p>
            <p className={`text-sm font-medium ${order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'} mb-2`}>
              Status: {order.status}
            </p>
            <p className="text-gray-800 font-bold mb-4">Total Amount: ${order.totalAmount.toFixed(2)}</p>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Order Details</h3>
            <ul className="pl-4">
              {order.orderDetails.map((detail) => (
                <li key={detail.orderDetailsID} className="mb-4 p-3 bg-white border rounded-md shadow-sm">
                 
                  <p className="text-gray-600 mb-1">Quantity: {detail.quantity}</p>
                  <p className="text-gray-600 mb-1">Price: ${detail.price.toFixed(2)}</p>
                  <p className="text-gray-800 font-bold">Total: ${detail.total.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm">Created At: {new Date(detail.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

  );
};



export default Page;
