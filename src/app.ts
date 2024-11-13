import express from "express";
import sequelize from "./utils/database";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

export default app;
