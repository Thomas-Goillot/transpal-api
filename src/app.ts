import express, { Router } from "express";
import sequelize from "./utils/database";
import authRoutes from "./routes/authRoutes";
import accountRoutes from "./routes/accountRoutes";
import paymentMethodRoutes from "./routes/paymentMethodRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());


sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err: { parent: any; }) => {
    console.error("Database connection error:", err)
    if (err.parent) {
      console.error("MySQL error:", err.parent)
    }
   });

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);
router.use("/payment-methods", paymentMethodRoutes);

app.use("/api", router);


export default app;
