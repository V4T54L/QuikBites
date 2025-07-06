package models

import "time"

type Address struct {
	Street     string  `json:"street,omitempty"`
	City       string  `json:"city,omitempty"`
	State      string  `json:"state,omitempty"`
	PostalCode string  `json:"postal_code,omitempty"`
	Lat        float64 `json:"lat,omitempty"`
	Long       float64 `json:"long,omitempty"`
}

type GeoJSON struct {
	Type string  `json:"type,omitempty"`
	Lat  float64 `json:"lat,omitempty"`
	Long float64 `json:"long,omitempty"`
}

type User struct {
	ID          int       `json:"id,omitempty"`
	Name        string    `json:"name,omitempty"`
	Email       string    `json:"email,omitempty"`
	Password    string    `json:"password,omitempty"` // Don't return this; set manually on write
	Phone       string    `json:"phone,omitempty"`
	Role        string    `json:"role,omitempty"` // "customer", "restaurant", "driver"
	CurrentAddr *Address  `json:"current_address,omitempty"`
	CreatedAt   time.Time `json:"created_at,omitempty"`
	UpdatedAt   time.Time `json:"updated_at,omitempty"`
}

type LoginResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

type Restaurant struct {
	ID          int       `json:"id,omitempty"`
	Name        string    `json:"name,omitempty"`
	Cuisine     string    `json:"cuisine,omitempty"`
	Address     string    `json:"address,omitempty"`
	Location    GeoJSON   `json:"location,omitempty"`
	IsOpen      bool      `json:"is_open"`
	Description string    `json:"description,omitempty"`
	OwnerID     int       `json:"owner_id,omitempty"`
	CreatedAt   time.Time `json:"created_at,omitempty"`
	UpdatedAt   time.Time `json:"updated_at,omitempty"`
}

type RestaurantDetails struct {
	Restaurant
	Menu []MenuItem `json:"menu,omitempty"`
}

type MenuItem struct {
	ID          int     `json:"id,omitempty"`
	Name        string  `json:"name,omitempty"`
	Description string  `json:"description,omitempty"`
	Price       float64 `json:"price"`
	ImageURL    string  `json:"image_url,omitempty"`
}

type CartItem struct {
	MenuItemID int     `json:"menu_item_id"`
	Name       string  `json:"name,omitempty"`
	Quantity   int     `json:"quantity"`
	Price      float64 `json:"price"`
}

type Order struct {
	ID           int        `json:"id,omitempty"`
	UserID       int        `json:"user_id,omitempty"`
	RestaurantID int        `json:"restaurant_id,omitempty"`
	DriverID     *int       `json:"driver_id,omitempty"`
	Status       string     `json:"status,omitempty"`
	Items        []CartItem `json:"items,omitempty"`
	TotalPrice   float64    `json:"total_price"`
	PaymentMode  string     `json:"payment_mode,omitempty"` // "cash", "card"
	Paid         bool       `json:"paid"`
	CustomerOTP  string     `json:"customer_otp,omitempty"`
	DeliveryTime *time.Time `json:"delivery_time,omitempty"`
	CreatedAt    time.Time  `json:"created_at,omitempty"`
	UpdatedAt    time.Time  `json:"updated_at,omitempty"`
}

type OrderDetail struct {
	Order
	RestaurantName string  `json:"restaurant_name,omitempty"`
	DriverName     *string `json:"driver_name,omitempty"`
	CustomerPhone  string  `json:"customer_phone,omitempty"`
}

type Driver struct {
	ID        int       `json:"id,omitempty"`
	Name      string    `json:"name,omitempty"`
	Phone     string    `json:"phone,omitempty"`
	Location  GeoJSON   `json:"location,omitempty"`
	IsOnline  bool      `json:"is_online"`
	IsBusy    bool      `json:"is_busy"`
	Vehicle   string    `json:"vehicle,omitempty"`
	Earnings  float64   `json:"earnings,omitempty"`
	Rating    float64   `json:"rating,omitempty"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
}

type RestaurantAnalytics struct {
	TotalOrders  int           `json:"total_orders"`
	TotalRevenue float64       `json:"total_revenue"`
	TopItems     []MenuItem    `json:"top_items,omitempty"`
	AvgPrepTime  time.Duration `json:"avg_prep_time,omitempty"`
}

type DriverAnalytics struct {
	TotalDeliveries int           `json:"total_deliveries"`
	TotalEarnings   float64       `json:"total_earnings"`
	AvgDeliveryTime time.Duration `json:"avg_delivery_time,omitempty"`
	Rating          float64       `json:"rating,omitempty"`
}
