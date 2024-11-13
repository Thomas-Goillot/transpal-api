import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";
import User from "./user";

class PaymentMethod extends Model {
  public id!: number;
  public userId!: number;
  public type!: "CARD" | "BANK_ACCOUNT";
  public details!: any;
}

PaymentMethod.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.ENUM("CARD", "BANK_ACCOUNT"), allowNull: false },
    details: { type: DataTypes.JSON, allowNull: false },
  },
  { sequelize, modelName: "payment_method" }
);

PaymentMethod.belongsTo(User, { foreignKey: "userId" });

export default PaymentMethod;
