import { Router } from "express";
import {
  addPaymentMethod,
  getPaymentMethods,
  deletePaymentMethod,
} from "../controllers/paymentMethodController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/:userId/add", authenticate, addPaymentMethod);
router.get("/:userId", authenticate, getPaymentMethods);
router.delete("/:userId/:paymentMethodId", authenticate, deletePaymentMethod);

export default router;
