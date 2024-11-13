import express, { Router } from "express";
import sequelize from "./utils/database";
import { authenticate } from "./middleware/authMiddleware";
import authRoutes from "./routes/authRoutes";
import accountRoutes from "./routes/accountRoutes";
import paymentMethodRoutes from "./routes/paymentMethodRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);
router.use("/payment-methods", paymentMethodRoutes);

sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

export default app;
