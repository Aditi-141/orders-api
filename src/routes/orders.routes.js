import { Router } from "express";
import { fetchOrders, fetchOrder, search, getStats , createBatchOrders} from "../controllers/orders.controller.js";

const router = Router();

// Stats route (must be before :id)
router.get("/orders/stats", getStats);

// Search route (must be before :id)
router.get("/orders/search", search);

// Get paginated orders
router.get("/orders", fetchOrders);

// Dynamic route (always last)
router.get("/orders/:id", fetchOrder);

router.post("/orders", createBatchOrders);  // <-- ADD THIS


export default router;
