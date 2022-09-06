const { dot } = require("../modules/common");

dot.config();

const config = {
  dev: {
    username: "22lim",
    password: process.env.DATABASE_PASSWORD_DEV,
    database: "22lim_test2",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "Asia/Seoul"
  },
  mailer: {
    user: process.env.EMAIL,
    pw: process.env.EMAIL_PW,
  },
};

const CONDITION = {
  WAITING : 1,
  ACTIVITY: 2,
  INACTIVITY: 3,
};

const AUTHORITY = {
  MANAGER: 1,
  USER: 2,
};

const BOARDS = {
  TIP_BOARD: "tipBoard",
  QNA_BOARD: "qnaBoard",
  // FREE_BOARD: "freeBoard",
};

const POINT = {
  JOIN: 1,
  WRITE_POST: 2,
  WRITE_REPLY: 3,
  SKIN_BUY: 4,
};

module.exports = { config, AUTHORITY, CONDITION, BOARDS, POINT };
