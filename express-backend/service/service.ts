import {
    Address,
    CartItem,
    DriverAnalytics,
    LoginResponse,
    MenuItem,
    OrderDetail,
    Restaurant,
    RestaurantAnalytics,
    RestaurantDetails,
    User,
} from '../model/model';

export interface UserService {
    register(user: User): Promise<void>;
    login(credentials: User): Promise<LoginResponse>;
    getProfile(userId: number): Promise<User>;
    updateProfile(user: User): Promise<void>;
    updateCurrentAddress(userId: number, address: Address): Promise<void>;
}

export interface RestaurantService {
    getRestaurants(lat: number, long: number, query: string): Promise<Restaurant[]>;
    getRestaurantDetails(restaurantID: number): Promise<RestaurantDetails>;
    updateRestaurantDetails(restaurant: Restaurant): Promise<void>;
    toggleAvailability(restaurantID: number, isOpen: boolean): Promise<void>;

    getMenu(restaurantID: number): Promise<MenuItem[]>;
    addMenuItem(restaurantID: number, item: MenuItem): Promise<void>;
    updateMenuItem(item: MenuItem): Promise<void>;
    deleteMenuItem(itemId: number): Promise<void>;

    getRestaurantOrders(restaurantID: number): Promise<OrderDetail[]>;
    updateOrderStatus(orderId: number, status: string): Promise<void>;
    getAnalytics(restaurantID: number): Promise<RestaurantAnalytics>;
}

export interface CartService {
    getCart(userId: number, restaurantID: number): Promise<CartItem[]>;
    addItemToCart(userId: number, restaurantID: number, itemId: number): Promise<void>;
    removeItemFromCart(userId: number, restaurantID: number, itemId: number): Promise<void>;
    clearCart(userId: number, restaurantID: number): Promise<void>;
}

export interface OrderService {
    placeOrder(userId: number, restaurantID: number, paymentMode: string): Promise<OrderDetail>;
    getOrderHistory(userId: number): Promise<OrderDetail[]>;
    getActiveOrders(userId: number): Promise<OrderDetail[]>;
    trackOrder(userId: number, orderId: number): Promise<OrderDetail>;
    verifyDeliveryOTP(userId: number, orderId: number, otp: string): Promise<void>;
    contactDriver(orderId: number): Promise<string>;
}

export interface DeliveryService {
    getAvailableOrders(driverID: number): Promise<OrderDetail[]>;
    acceptOrder(driverID: number, orderID: number): Promise<void>;
    getActiveOrders(driverID: number): Promise<OrderDetail[]>;
    updateOrderStatus(driverID: number, orderID: number, status: string): Promise<void>;
    verifyDeliveryCompletion(driverID: number, orderID: number, otp: string): Promise<void>;
    getOrderHistory(driverID: number): Promise<OrderDetail[]>;
    getAnalytics(driverID: number): Promise<DriverAnalytics>;
    contactCustomer(orderID: number): Promise<string>;
    updateLocation(driverID: number, lat: number, long: number): Promise<void>;
}



