import { getAllOrders, getOrderById, searchOrders } from "../models/orders.model.js";

export const fetchOrders = async (req, res) => {
  try {
    const result = await getAllOrders();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchOrder = async (req, res) => {
  try {
    const result = await getOrderById(req.params.id);
    if (result.rows.length === 0) return res.status(404).json({ message: "Order not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const search = async (req, res) => {
  try {
    const q = req.query.q || "";
    const result = await searchOrders(q);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
