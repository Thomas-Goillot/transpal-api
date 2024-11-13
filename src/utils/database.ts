import { Sequelize } from "sequelize";

const sequelize = new Sequelize("transpal", "root", "rootpassword", {
  host: "db",
  dialect: "mariadb",
});

export default sequelize;
