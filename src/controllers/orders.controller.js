import { 
  getAllOrders, 
  getOrderById, 
  searchOrders ,
  insertBatchOrders 
} from "../models/orders.model.js";
import { pool } from "../config/db.js";

// GET /orders?page=1&limit=50
export const fetchOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;

    const result = await getAllOrders(page, limit);
    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /orders/:id
export const fetchOrder = async (req, res) => {
  try {
    const result = await getOrderById(req.params.id);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Order not found" });

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /orders/search?q=laptop&page=1
export const search = async (req, res) => {
  try {
    const q = req.query.q || "";
    const page = Number(req.query.page) || 1;
    const limit = 50;

    const result = await searchOrders(q, page, limit);
    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /orders/stats
export const getStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) AS total,
        AVG(amount) AS avg_amount,
        MIN(amount) AS min_amount,
        MAX(amount) AS max_amount
      FROM orders;
    `);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBatchOrders = async (req, res) => {
  try {
    const orders = req.body.orders;

    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: "Invalid or empty orders array" });
    }

    const result = await insertBatchOrders(orders);
    res.status(201).json({
      inserted: result.rows.length,
      orders: result.rows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
