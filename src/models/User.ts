import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "user" }
);

export default User;
