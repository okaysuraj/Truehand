# API Reference

Base URL: `http://localhost:8080`

---

## Authentication

### Register

```
POST /api/auth/register
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "postalCode": "400001"
}
```

**Response:** `200 OK`
```json
{
  "userId": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "role": "CUSTOMER"
}
```

### Login

```
POST /api/auth/login
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:** Same as register response.

**Using the token:** Include in the `Authorization` header for authenticated requests:
```
Authorization: Bearer <token>
```

---

## Products

### List all products (paginated)

```
GET /api/products?page=0&size=10&sort=name,asc
```

**Response:** `200 OK` — Spring `Page<ProductDTO>`
```json
{
  "content": [
    {
      "id": 1,
      "name": "Fresh Tomatoes",
      "description": "Ripe red tomatoes",
      "category": "Vegetables",
      "price": 50.00,
      "stockQuantity": 100,
      "imageUrl": null,
      "isAvailable": true
    }
  ],
  "totalElements": 8,
  "totalPages": 1,
  "number": 0
}
```

### Get product by ID

```
GET /api/products/{id}
```

### Search by name

```
GET /api/products/search/{name}
```

**Response:** `200 OK` — `List<ProductDTO>` matching the search term (case-insensitive).

### Filter by category

```
GET /api/products/category/{category}
```

**Categories in sample data:** `Vegetables`, `Dairy`, `Grains`, `Oils`, `Fruits`

### Create product

```
POST /api/products
```

**Request:**
```json
{
  "name": "Fresh Oranges",
  "description": "Sweet juicy oranges",
  "category": "Fruits",
  "price": 70.00,
  "stockQuantity": 50,
  "isAvailable": true
}
```

### Update product

```
PUT /api/products/{id}
```

Accepts partial updates — only non-null fields are applied.

### Delete product

```
DELETE /api/products/{id}
```

---

## Orders

### Create order

```
POST /api/orders
```

**Request:**
```json
{
  "totalAmount": 150.00,
  "deliveryAddress": "123 Main St, Mumbai",
  "specialInstructions": "Leave at door"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "orderNumber": "uuid-string",
  "totalAmount": 150.00,
  "status": "CONFIRMED",
  "paymentStatus": "PAID",
  "deliveryAddress": "123 Main St, Mumbai",
  "createdAt": "2026-06-02T10:30:00"
}
```

> **Note:** A `Delivery` record is automatically created with `PENDING` status and a 2-hour estimated delivery window.

### Get order by ID

```
GET /api/orders/{id}
```

### Get current user's orders

```
GET /api/orders
```

---

## Deliveries

### Get delivery info

```
GET /api/deliveries/{orderId}
```

### Start delivery

```
POST /api/deliveries/{orderId}/start
```

Sets status to `IN_TRANSIT` and broadcasts a WebSocket notification to tracking subscribers.

### Update delivery location

```
POST /api/deliveries/{orderId}/location?latitude=19.0760&longitude=72.8777&accuracy=5.0
```

Saves the GPS location to the database and broadcasts a real-time location update via WebSocket.

### Complete delivery

```
POST /api/deliveries/{orderId}/complete
```

Sets status to `DELIVERED`, records the delivery time, and broadcasts a completion notification.

---

## WebSocket — Real-time Tracking

### Connection

```
ws://localhost:8080/ws/tracking
```

### Protocol

**1. Client subscribes to an order:**
```json
{
  "action": "SUBSCRIBE",
  "orderId": 1,
  "data": ""
}
```

**2. Server confirms subscription:**
```json
{
  "status": "SUBSCRIBED",
  "orderId": 1,
  "message": "You are now tracking order #1"
}
```

**3. Server sends location updates (when delivery location changes):**
```json
{
  "type": "LOCATION_UPDATE",
  "orderId": 1,
  "latitude": 19.0760,
  "longitude": 72.8777,
  "accuracy": 5.0,
  "timestamp": 1717141959000,
  "status": "IN_TRANSIT"
}
```

**4. Server sends status updates (on delivery start/complete):**
```json
{
  "type": "STATUS_UPDATE",
  "orderId": 1,
  "status": "DELIVERED",
  "message": "Your order has been delivered",
  "timestamp": 1717141959000
}
```

### Testing with wscat

```bash
npm install -g wscat
wscat -c ws://localhost:8080/ws/tracking
> {"action":"SUBSCRIBE","orderId":1,"data":""}
```

### Testing with browser console

```javascript
const ws = new WebSocket('ws://localhost:8080/ws/tracking');
ws.onopen = () => ws.send(JSON.stringify({ action: 'SUBSCRIBE', orderId: 1, data: '' }));
ws.onmessage = (e) => console.log(JSON.parse(e.data));
```

---

## Testing with curl

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'

# List products
curl http://localhost:8080/api/products

# Search products
curl http://localhost:8080/api/products/search/tomato

# Filter by category
curl http://localhost:8080/api/products/category/Fruits

# Create order
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{"totalAmount":150.00,"deliveryAddress":"123 Main St"}'

# Start delivery
curl -X POST http://localhost:8080/api/deliveries/1/start

# Update location
curl -X POST "http://localhost:8080/api/deliveries/1/location?latitude=19.076&longitude=72.877&accuracy=5.0"

# Complete delivery
curl -X POST http://localhost:8080/api/deliveries/1/complete
```

---

## Error Responses

All errors return a standard structure:

| Status | Meaning |
|--------|---------|
| `400` | Bad request / validation error |
| `401` | Unauthorized — missing or invalid JWT |
| `404` | Resource not found |
| `409` | Conflict — e.g., duplicate email on registration |
| `500` | Internal server error |
