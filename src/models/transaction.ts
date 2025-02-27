import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";
import User from "./user";

class Transaction extends Model {
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public amount!: number;
  public currency!: string;
  public type!: "SEND" | "ADD_FUNDS" | "WITHDRAW";
}

Transaction.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false, defaultValue: "USD" },
    type: {
      type: DataTypes.ENUM("SEND", "ADD_FUNDS", "WITHDRAW"),
      allowNull: false,
    },
  },
  { sequelize, modelName: "transaction" }
);

Transaction.belongsTo(User, { as: "sender", foreignKey: "senderId" });
Transaction.belongsTo(User, { as: "receiver", foreignKey: "receiverId" });

export default Transaction;
