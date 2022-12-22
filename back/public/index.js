// 설치해야할것
// sequelize,mysql2 둘 다 설치
const Sequelize = require("sequelize");
const config = require("../config.json");
const User = require("./User");
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  process.env.DATABASE_PASSWORD,
  config.development
);

const db = {};

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

User.associate(db);

module.exports = db;
