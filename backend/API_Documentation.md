# E-Commerce API Documentation

## Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://your-production-url.com`

---

## Authentication Endpoints

### 1. User Registration
**POST** `/api/user/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Error Responses:**
- `400`: Invalid input or user already exists
- `500`: Server error

---

### 2. User Login
**POST** `/api/user/login`

Authenticate user and receive access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Error Responses:**
- `401`: Invalid credentials
- `500`: Server error

---

### 3. Admin Login
**POST** `/api/user/admin/login`

Authenticate admin and receive admin access token.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "adminpass"
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "adminId": "507f1f77bcf86cd799439011"
}
```

**Error Responses:**
- `401`: Invalid admin credentials
- `500`: Server error

---

## Product Endpoints

### 4. Add Product
**POST** `/api/product/add`

Create a new product with multiple images.

**Request Type:** `multipart/form-data`

**Form Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Product name |
| description | string | Yes | Product description |
| price | number | Yes | Product price |
| category | string | Yes | Product category (e.g., Clothing, Electronics) |
| subCategory | string | No | Product sub-category (e.g., Shirts) |
| sizes | string | No | Available sizes (comma-separated: S,M,L,XL) |
| bestseller | boolean | No | Mark as bestseller product |
| image1 | file | Yes | First product image |
| image2 | file | Yes | Second product image |
| image3 | file | Yes | Third product image |
| image4 | file | Yes | Fourth product image |

**Example Request (using cURL):**
```bash
curl -X POST http://localhost:5000/api/product/add \
  -F "name=Premium T-Shirt" \
  -F "description=High quality cotton t-shirt" \
  -F "price=29.99" \
  -F "category=Clothing" \
  -F "subCategory=Shirts" \
  -F "sizes=S,M,L,XL" \
  -F "bestseller=false" \
  -F "image1=@path/to/image1.jpg" \
  -F "image2=@path/to/image2.jpg" \
  -F "image3=@path/to/image3.jpg" \
  -F "image4=@path/to/image4.jpg"
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "Product added successfully",
  "productId": "507f1f77bcf86cd799439011"
}
```

**Error Responses:**
- `400`: Invalid input or missing required fields
- `500`: Server error

---

### 5. List Products
**POST** `/api/product/list`

Retrieve all products with optional filters.

**Request Body (Optional):**
```json
{
  "category": "Clothing",
  "limit": 10,
  "skip": 0
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Premium T-Shirt",
      "description": "High quality cotton t-shirt",
      "price": 29.99,
      "category": "Clothing",
      "subCategory": "Shirts",
      "sizes": ["S", "M", "L", "XL"],
      "bestseller": false,
      "images": [
        "https://cloudinary.com/image1.jpg",
        "https://cloudinary.com/image2.jpg",
        "https://cloudinary.com/image3.jpg",
        "https://cloudinary.com/image4.jpg"
      ]
    }
  ]
}
```

**Error Responses:**
- `500`: Server error

---

### 6. Get Single Product
**POST** `/api/product/single`

Retrieve details of a specific product.

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439011"
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Premium T-Shirt",
    "description": "High quality cotton t-shirt",
    "price": 29.99,
    "category": "Clothing",
    "subCategory": "Shirts",
    "sizes": ["S", "M", "L", "XL"],
    "bestseller": false,
    "images": [
      "https://cloudinary.com/image1.jpg",
      "https://cloudinary.com/image2.jpg",
      "https://cloudinary.com/image3.jpg",
      "https://cloudinary.com/image4.jpg"
    ]
  }
}
```

**Error Responses:**
- `404`: Product not found
- `500`: Server error

---

### 7. Remove Product
**POST** `/api/product/remove`

Delete a product by ID.

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439011"
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "Product removed successfully"
}
```

**Error Responses:**
- `404`: Product not found
- `500`: Server error

---

## Common Response Format

All API responses follow this structure:

```json
{
  "success": true/false,
  "message": "Response message (if applicable)",
  "data": {} // Response data (if applicable)
}
```

---

## Error Handling

### HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid credentials |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Notes

- All file uploads use **Cloudinary** for storage
- Images are automatically compressed and optimized
- Maximum file size for images: As per Multer configuration
- All endpoints return JSON responses

