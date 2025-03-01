import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";
import User from "./user";

class PaymentMethod extends Model {
  public id!: number;
  public userId!: number;
  public type!: "CARD" | "BANK_ACCOUNT";
  public name!: string;
  public cardNumber!: string;
  public expiryDate!: string;
  public cvv!: string;
  public readonly createdAt!: Date;
}

PaymentMethod.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: {
      type: DataTypes.ENUM("CARD", "BANK_ACCOUNT"),
      allowNull: false,
      defaultValue: "CARD",
    },
    name: { type: DataTypes.STRING, allowNull: false },
    cardNumber: { type: DataTypes.STRING, allowNull: false },
    expiryDate: { type: DataTypes.STRING, allowNull: false },
    cvv: { type: DataTypes.STRING, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "payment_method" }
);

PaymentMethod.belongsTo(User, { foreignKey: "userId" });

export default PaymentMethod;
