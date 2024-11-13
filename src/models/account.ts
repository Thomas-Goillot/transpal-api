import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";
import User from "./user";

class Account extends Model {
  public id!: number;
  public userId!: number;
  public balance!: number;
}

Account.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    balance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
  },
  { sequelize, modelName: "account" }
);

Account.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Account, { foreignKey: "userId" });

export default Account;
