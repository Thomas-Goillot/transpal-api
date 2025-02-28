import { Router } from "express";
import {
  sendMoney,
  getTransactionHistory,
  getUsersSentMoneyTo,
} from "../controllers/transactionController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

router.post("/send", sendMoney);
router.get("/:userId/history", getTransactionHistory);
router.get("/:userId/sent-to", getUsersSentMoneyTo);

export default router;
