# Pocket Dial API Documentation

## Authentication

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-03-20T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

## Watches

### Get All Watches
```http
GET /api/watches
Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- brand: string (optional)
- priceMin: number (optional)
- priceMax: number (optional)
- movement: string (optional)
```

Response:
```json
{
  "success": true,
  "data": {
    "watches": [
      {
        "id": "watch123",
        "brand": "Rolex",
        "model": "Submariner",
        "reference": "126610LN",
        "price": 9500,
        "movement": "Automatic",
        "caseSize": 41,
        "waterResistance": 300,
        "images": ["url1", "url2"],
        "specifications": {
          "case": "Stainless Steel",
          "dial": "Black",
          "bracelet": "Oyster"
        }
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "pages": 10
    }
  }
}
```

### Get Watch by ID
```http
GET /api/watches/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "watch": {
      "id": "watch123",
      "brand": "Rolex",
      "model": "Submariner",
      "reference": "126610LN",
      "price": 9500,
      "movement": "Automatic",
      "caseSize": 41,
      "waterResistance": 300,
      "images": ["url1", "url2"],
      "specifications": {
        "case": "Stainless Steel",
        "dial": "Black",
        "bracelet": "Oyster"
      },
      "reviews": [
        {
          "id": "review123",
          "userId": "user123",
          "rating": 5,
          "comment": "Excellent watch!",
          "createdAt": "2024-03-20T10:00:00Z"
        }
      ]
    }
  }
}
```

## User Profile

### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "name": "John Doe",
      "preferences": {
        "brands": ["Rolex", "Omega"],
        "priceRange": {
          "min": 5000,
          "max": 15000
        },
        "movements": ["Automatic", "Manual"]
      },
      "watchlist": ["watch123", "watch456"],
      "createdAt": "2024-03-20T10:00:00Z"
    }
  }
}
```

### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "preferences": {
    "brands": ["Rolex", "Omega", "Patek Philippe"],
    "priceRange": {
      "min": 5000,
      "max": 20000
    }
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "name": "John Doe Updated",
      "preferences": {
        "brands": ["Rolex", "Omega", "Patek Philippe"],
        "priceRange": {
          "min": 5000,
          "max": 20000
        }
      }
    }
  }
}
```

## Retailers

### Get All Retailers
```http
GET /api/retailers
Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- location: string (optional)
- verified: boolean (optional)
```

Response:
```json
{
  "success": true,
  "data": {
    "retailers": [
      {
        "id": "retailer123",
        "name": "Luxury Watches Inc",
        "location": "New York, NY",
        "verified": true,
        "rating": 4.5,
        "contact": {
          "email": "contact@luxurywatches.com",
          "phone": "+1-555-0123",
          "website": "https://luxurywatches.com"
        },
        "inventory": ["watch123", "watch456"]
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "pages": 5
    }
  }
}
```

## Error Responses

All endpoints may return the following error responses:

### Authentication Error
```json
{
  "success": false,
  "error": {
    "code": "AUTH_ERROR",
    "message": "Invalid credentials",
    "status": 401
  }
}
```

### Validation Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Invalid email format",
      "password": "Password must be at least 8 characters"
    },
    "status": 400
  }
}
```

### Not Found Error
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "status": 404
  }
}
```

### Server Error
```json
{
  "success": false,
  "error": {
    "code": "SERVER_ERROR",
    "message": "Internal server error",
    "status": 500
  }
}
``` 