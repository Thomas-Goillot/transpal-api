import { Router } from "express";
import {
  getAccountBalance,
  addFunds,
  withdrawFunds,
} from "../controllers/accountController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/:userId/balance", authenticate, getAccountBalance);
router.post("/:userId/add-funds", authenticate, addFunds);
router.post("/:userId/withdraw", authenticate, withdrawFunds);

export default router;
