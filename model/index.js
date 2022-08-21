const { Sequelize } = require("../modules/db");

const config = require("../config/config");
console.log(config);
console.log(config.dev);
console.log(config.dev.database);
const User = require("./users");

const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
);

// console.log(sequelize);

const db = {};
db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

// 테이블간의 관계 설정

module.exports = db;