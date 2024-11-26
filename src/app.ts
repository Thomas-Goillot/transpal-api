import express, { Router } from "express";
import sequelize from "./utils/database";
import authRoutes from "./routes/authRoutes";
import accountRoutes from "./routes/accountRoutes";
import paymentMethodRoutes from "./routes/paymentMethodRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

const MAX_RETRIES = 5; 
const RETRY_DELAY = 5000;

async function connectToDatabase() {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      attempt++;
      console.log(`Attempt ${attempt} to connect to the database...`);
      await sequelize.authenticate(); 
      await sequelize.sync(); 
      console.log("Database connected successfully.");
      return; 
    } catch (error :any) {
      console.error(`Database connection error: ${error.message}`);
      if (attempt < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error(
          "Max retries reached. Unable to connect to the database."
        );
      }
    }
  }
}

(async () => {
  try {
    await connectToDatabase();

    const router = Router();
    router.use("/auth", authRoutes);
    router.use("/users", userRoutes);
    router.use("/accounts", accountRoutes);
    router.use("/transactions", transactionRoutes);
    router.use("/payment-methods", paymentMethodRoutes);

    app.use("/api", router);
  }
  catch {
    return;
  }
})();

export default app;
