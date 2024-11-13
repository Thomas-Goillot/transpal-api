import { Router } from "express";
import {
  sendMoney,
  getTransactionHistory,
} from "../controllers/transactionController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

router.post("/send", sendMoney);
router.get("/:userId/history", getTransactionHistory);

export default router;
