import { pool } from "../config/db.js";

// 1. Pagination — supports ?page=1&limit=50
export const getAllOrders = async (page = 1, limit = 50) => {
  const offset = (page - 1) * limit;

  return pool.query(
    `SELECT * FROM orders 
     ORDER BY id 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
};

// 2. Get a single order
export const getOrderById = async (id) => {
  return pool.query(
    `SELECT * FROM orders WHERE id = $1`,
    [id]
  );
};

// 3. Search — indexed search with pagination
export const searchOrders = async (q, page = 1, limit = 50) => {
  const offset = (page - 1) * limit;

  return pool.query(
    `SELECT * FROM orders
     WHERE product_name ILIKE $1
     ORDER BY id
     LIMIT $2 OFFSET $3`,
    [`%${q}%`, limit, offset]
  );
};

// 4. Batch insert 100+ orders — FAST insert
export const insertBatchOrders = async (orders) => {
  const values = [];
  const placeholders = orders.map((order, i) => {
    values.push(order.product_name, order.amount, order.quantity, order.customer_id);
    const base = i * 4;
    return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`;
  });

  const query = `
    INSERT INTO orders (product_name, amount, quantity, customer_id)
    VALUES ${placeholders.join(", ")}
    RETURNING *;
  `;

  return pool.query(query, values);
};

