const Sequelize = require("sequelize");

const config = require("../config/config");

const User = require("./users");
const Authority = require("./authority");
const TipBoard = require("./tip_board");
const TipReply = require("./tip_reply");
const Chatting = require("./chatting");
const GameSkinProducts = require("./game_skin_products");
const QnaBoard = require("./qna_board");

const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};
db.sequelize = sequelize;

db.User = User;
db.Authority = Authority;
db.TipBoard = TipBoard;
db.TipReply = TipReply;
db.Chatting = Chatting;
db.GameSkinProducts = GameSkinProducts;
db.QnaBoard = QnaBoard;

// 테이블 생성
Authority.init(sequelize);
User.init(sequelize);
TipBoard.init(sequelize);
TipReply.init(sequelize);
Chatting.init(sequelize);
GameSkinProducts.init(sequelize);
QnaBoard.init(sequelize);

// 테이블간의 관계 설정
Authority.associate(db);
User.associate(db);
TipBoard.associate(db);
TipReply.associate(db);
Chatting.associate(db);
GameSkinProducts.associate(db);
QnaBoard.associate(db);

module.exports = db;
