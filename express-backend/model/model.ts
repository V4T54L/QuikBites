import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: User;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  lat: number;
  long: number;
}

export interface GeoJSON {
  type: string;
  lat: number;
  long: number;
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string; // not to expose in responses
  phone?: string;
  role?: 'customer' | 'restaurant' | 'driver';
  currentAddress?: Address;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  address: string;
  location: GeoJSON;
  eta_mins: number;
  isOpen: boolean;
  description?: string;
  bannerUrl?: string;
  rating: number;
  ownerId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface RestaurantDetails extends Restaurant {
  menu?: MenuItem[];
}

export interface CartItem {
  menuItemId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: number;
  userId?: number;
  restaurantId: number;
  driverId: number | null;
  status: string;
  items: CartItem[];
  tax: number;
  deliveryCharge: number;
  handlingCharge: number;
  packagingCharge: number;
  rainFee: number;
  totalPrice: number;
  paymentMode: 'cash' | 'card';
  paid: boolean;
  customerOtp?: string;
  deliveryTime?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderDetail extends Order {
  restaurantName: string;
  driverName: string | null;
  customerPhone: string;
  customerName: string;
}

export interface Driver {
  id?: number;
  name: string;
  phone: string;
  location: GeoJSON;
  isOnline: boolean;
  isBusy: boolean;
  vehicle?: string;
  earnings?: number;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RestaurantAnalytics {
  totalOrders: number;
  totalRevenue: number;
  rating?: number;
  topItems?: MenuItem[];
  avgPrepTime?: number; // in milliseconds
  recentOrders?: OrderDetail[];
}

export interface DriverAnalytics {
  totalDeliveries: number;
  totalEarnings: number;
  avgDeliveryTime?: number; // in milliseconds
  rating?: number;
}
