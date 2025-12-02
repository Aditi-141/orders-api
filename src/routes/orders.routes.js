import { Router } from "express";
import { fetchOrders, fetchOrder, search } from "../controllers/orders.controller.js";

const router = Router();

//Search must come before :id
router.get("/orders/search", search);

//Get all orders
router.get("/orders", fetchOrders);

// Get one order
router.get("/orders/:id", fetchOrder);

export default router;
