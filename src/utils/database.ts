import { Sequelize } from "sequelize";

const sequelize = new Sequelize("transpal", "root", "rootpassword", {
  host: "transpal-db",
  dialect: "mysql",
  dialectModule : require('mysql2'),
  logging: console.log,
});

export default sequelize;
