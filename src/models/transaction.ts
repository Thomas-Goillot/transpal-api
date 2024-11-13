import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";
import User from "./user";

class Transaction extends Model {
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public amount!: number;
  public currency!: string;
}

Transaction.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false, defaultValue: "USD" },
  },
  { sequelize, modelName: "transaction" }
);

Transaction.belongsTo(User, { as: "sender", foreignKey: "senderId" });
Transaction.belongsTo(User, { as: "receiver", foreignKey: "receiverId" });

export default Transaction;
