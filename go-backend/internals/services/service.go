package services

import (
	"context"
	"quikbites-be/internals/models"
)

type UserService interface {
	Register(ctx context.Context, user models.User) error
	Login(ctx context.Context, credentials models.User) (models.LoginResponse, error)
	GetProfile(ctx context.Context, userId int) (models.User, error)
	UpdateProfile(ctx context.Context, user models.User) error
	UpdateCurrentAddress(ctx context.Context, userId int, address models.Address) error
}

type RestaurantService interface {
	GetRestaurants(ctx context.Context, lat, long float64, query string) ([]models.Restaurant, error)
	GetRestaurantDetails(ctx context.Context, restaurantID int) (models.RestaurantDetails, error)
	UpdateRestaurantDetails(ctx context.Context, restaurant models.Restaurant) error
	ToggleAvailability(ctx context.Context, restaurantID int, isOpen bool) error

	GetMenu(ctx context.Context, restaurantID int) ([]models.MenuItem, error)
	AddMenuItem(ctx context.Context, restaurantID int, item models.MenuItem) error
	UpdateMenuItem(ctx context.Context, item models.MenuItem) error
	DeleteMenuItem(ctx context.Context, itemId int) error

	GetRestaurantOrders(ctx context.Context, restaurantID int) ([]models.OrderDetail, error)
	UpdateOrderStatus(ctx context.Context, orderId int, status string) error
	GetAnalytics(ctx context.Context, restaurantID int) (models.RestaurantAnalytics, error)
}

type CartService interface {
	GetCart(ctx context.Context, userId, restaurantID int) ([]models.CartItem, error)
	AddItemToCart(ctx context.Context, userId, restaurantID, itemId int) error
	RemoveItemFromCart(ctx context.Context, userId, restaurantID, itemId int) error
	ClearCart(ctx context.Context, userId, restaurantID int) error
}

type OrderService interface {
	PlaceOrder(ctx context.Context, userId, restaurantID int, paymentMode string) (models.OrderDetail, error)
	GetOrderHistory(ctx context.Context, userId int) ([]models.OrderDetail, error)
	GetActiveOrders(ctx context.Context, userId int) ([]models.OrderDetail, error)
	TrackOrder(ctx context.Context, userId, orderId int) (models.OrderDetail, error)
	VerifyDeliveryOTP(ctx context.Context, userId, orderId int, otp string) error
	ContactDriver(ctx context.Context, orderId int) (string, error)
}

type DeliveryService interface {
	GetAvailableOrders(ctx context.Context, driverID int) ([]models.OrderDetail, error)
	AcceptOrder(ctx context.Context, driverID, orderID int) error
	GetActiveOrders(ctx context.Context, driverID int) ([]models.OrderDetail, error)
	UpdateOrderStatus(ctx context.Context, driverID, orderID int, status string) error
	VerifyDeliveryCompletion(ctx context.Context, driverID, orderID int, otp string) error
	GetOrderHistory(ctx context.Context, driverID int) ([]models.OrderDetail, error)
	GetAnalytics(ctx context.Context, driverID int) (models.DriverAnalytics, error)
	ContactCustomer(ctx context.Context, orderID int) (string, error)
	UpdateLocation(ctx context.Context, driverID int, lat, long float64) error
}
