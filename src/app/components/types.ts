// Define the structure for OrderDetails
export interface OrderDetails {
  orderDetailsID: number;
  orderID: number;
  listingID: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: Date;
}

// Define the structure for Order
export interface Order {
  orderID: number;
  userID: number;
  orderPlaced: string;
  orderFulfilled?: string; // Optional, since it can be null
  customerID: number;
  isOrderFulfilled: boolean;
  status: string;
  totalAmount: number;
  orderDetails: OrderDetails[];
}
 