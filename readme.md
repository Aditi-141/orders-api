#  High-Performance Orders API  
A production-grade, scalable, and Redis-optimized REST API for managing and querying orders with high performance.  
Built using **Node.js**, **Express**, **PostgreSQL**, and **Redis**.

---

## Features

### 1. Cursor-Based Pagination  
Efficient large-dataset pagination using a cursor (not offset), ensuring constant-time navigation.

### 2. High-Performance Caching (Redis)
- Caches expensive queries (like `/stats`)
- Caches single order lookups (`/orders/:id`)
- Auto-expires & refreshes intelligently
- Reduces database load by 80–90%

### 3. Full-Text Search
Search orders by product name using Postgres + pg_trgm:

GET /api/orders/search?q=mac


### 4. Batch Insert (Bulk Import)
Supports inserting multiple orders in a single request:

POST /api/orders
[
{ "product_name": "Laptop", "amount": 1200, "quantity": 1, "customer_id": 10 },
{ "product_name": "Phone", "amount": 800, "quantity": 2, "customer_id": 11 }
]


### 5. Structured API Layer
- Controllers
- Routes
- Config
- Utils
- Redis cache helpers

### 6. Clean, Maintainable Architecture

src/
├── config/
│ ├── db.js
│ └── redis.js
├── controllers/
│ └── order.controller.js
├── routes/
│ └── order.routes.js
├── utils/
│ └── cache.js
└── server.js


## Tech Stack

| Component     | Technology |
|---------------|------------|
| Backend       | Node.js, Express |
| Database      | PostgreSQL |
| Caching Layer | Redis (ioredis) |
| Search        | PostgreSQL pg_trgm |
| Architecture  | MVC + Clean utils |

---

## Installation

### 1. Clone the project

git clone <repo-url>
cd orders-api


### 2. Install dependencies

npm install


### 3. Setup PostgreSQL

Create database:

```sql
CREATE DATABASE ordersdb;

Create table:

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  quantity INT NOT NULL,
  customer_id INT,
  created_at TIMESTAMP DEFAULT NOW()
);

Enable search extension:

CREATE EXTENSION IF NOT EXISTS pg_trgm;

Running Redis

Windows:

.\redis-server.exe

Keep this terminal running.
▶️ Run the API

npm start

Your API runs at:

http://localhost:5000

📡 API Endpoints
👉 Get orders (cursor pagination)

GET /api/orders?limit=20&cursor=10

👉 Get single order

GET /api/orders/:id

👉 Batch insert orders

POST /api/orders

Body must be an array:

[
  {s
    "product_name": "Laptop",
    "amount": 1200,
    "quantity": 1,
    "customer_id": 101
  }
]

Get stats (cached for 120 seconds)

GET /api/orders/stats
 Search orders

Example Stats Output

{
  "total_orders": 3,
  "total_amount": 4000,
  "avg_amount": 1333.33
}
