import { pool } from "../config/db.js";

export const getAllOrders = async () => {
  return pool.query(`SELECT * FROM orders ORDER BY id ASC LIMIT 100`);
};

export const getOrderById = async (id) => {
  return pool.query(`SELECT * FROM orders WHERE id = $1`, [id]);
};

export const searchOrders = async (query) => {
  return pool.query(
    `SELECT * FROM orders WHERE product_name ILIKE $1 LIMIT 50`,
    [`%${query}%`]
  );
};
