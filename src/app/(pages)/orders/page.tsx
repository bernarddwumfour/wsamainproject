"use client";
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Order } from '../../components/types';

interface OrdersPageProps {
  userId: number;
}

const Page: React.FC<OrdersPageProps> = ({ userId=0 }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = process.env.NEXT_PUBLIC_ORDERMANAGEMENT_API_URL;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>(`${apiUrl}/api/Users/${userId}/Orders`);
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
    <div className="m-40">
    <div className="mt-20">
      <h1>Past Orders</h1>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderID} className="border-r-8 border-gray-500">
              <h2>Order ID: {order.orderID}</h2>
              <p>Order Placed: {new Date(order.orderPlaced).toLocaleString()}</p>
              <p>Order Fulfilled: {order.orderFulfilled ? new Date(order.orderFulfilled).toLocaleString() : 'Not fulfilled yet'}</p>
              <p>Status: {order.status}</p>
              <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <h3>Order Details</h3>
              <ul>
                {order.orderDetails.map((detail) => (
                  <li key={detail.orderDetailsID}>
                    <p>Listing ID: {detail.listingID}</p>
                    <p>Quantity: {detail.quantity}</p>
                    <p>Price: ${detail.price.toFixed(2)}</p>
                    <p>Total: ${detail.total.toFixed(2)}</p>
                    <p>Created At: {new Date(detail.createdAt).toLocaleString()}</p>
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
