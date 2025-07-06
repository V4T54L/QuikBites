import { Request, Response } from 'express';

export interface UserController {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  getProfile(req: Request, res: Response): Promise<void>;
  updateProfile(req: Request, res: Response): Promise<void>;
  updateCurrentAddress(req: Request, res: Response): Promise<void>;
}

export interface RestaurantController {
  getRestaurants(req: Request, res: Response): Promise<void>;
  getRestaurantDetails(req: Request, res: Response): Promise<void>;
  updateRestaurantDetails(req: Request, res: Response): Promise<void>;
  toggleAvailability(req: Request, res: Response): Promise<void>;

  getMenu(req: Request, res: Response): Promise<void>;
  addMenuItem(req: Request, res: Response): Promise<void>;
  updateMenuItem(req: Request, res: Response): Promise<void>;
  deleteMenuItem(req: Request, res: Response): Promise<void>;

  getRestaurantOrders(req: Request, res: Response): Promise<void>;
  updateOrderStatus(req: Request, res: Response): Promise<void>;
  getAnalytics(req: Request, res: Response): Promise<void>;
}

export interface CartController {
  getCart(req: Request, res: Response): Promise<void>;
  addItemToCart(req: Request, res: Response): Promise<void>;
  removeItemFromCart(req: Request, res: Response): Promise<void>;
  clearCart(req: Request, res: Response): Promise<void>;
}

export interface OrderController {
  placeOrder(req: Request, res: Response): Promise<void>;
  getOrderHistory(req: Request, res: Response): Promise<void>;
  getActiveOrders(req: Request, res: Response): Promise<void>;
  trackOrder(req: Request, res: Response): Promise<void>;
  verifyDeliveryOTP(req: Request, res: Response): Promise<void>;
  contactDriver(req: Request, res: Response): Promise<void>;
}

export interface DeliveryController {
  getAvailableOrders(req: Request, res: Response): Promise<void>;
  acceptOrder(req: Request, res: Response): Promise<void>;
  getActiveOrders(req: Request, res: Response): Promise<void>;
  updateOrderStatus(req: Request, res: Response): Promise<void>;
  verifyDeliveryCompletion(req: Request, res: Response): Promise<void>;
  getOrderHistory(req: Request, res: Response): Promise<void>;
  getAnalytics(req: Request, res: Response): Promise<void>;
  contactCustomer(req: Request, res: Response): Promise<void>;
  updateLocation(req: Request, res: Response): Promise<void>;
}
