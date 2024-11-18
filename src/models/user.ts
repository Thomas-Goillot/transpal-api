import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, modelName: "user" }
);

export default User;
