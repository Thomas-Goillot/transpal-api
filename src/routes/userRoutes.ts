import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/:userId", authenticate, getUserProfile); 
router.put("/:userId", authenticate, updateUserProfile); 
router.delete("/:userId", authenticate, deleteUser);

export default router;
