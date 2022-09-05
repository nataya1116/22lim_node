const Sequelize = require("sequelize");

const { config } = require("../config/config");

const User = require("./users");
const Authority = require("./authority");
const TipBoard = require("./tip_board");
const TipReply = require("./tip_reply");
const Chatting = require("./chatting");
const GameSkinProducts = require("./game_skin_products");
const GameSkinUser = require("./game_skin_user");
const GameSkinWish = require("./game_skin_wish");
const PointTotal = require("./point_total");
const PointHistory = require("./point_history");
const PointType = require("./point_type");
const ConditionUser = require("./condition_user");
const QnaBoard = require("./qna_board");
const QnaReply = require("./qna_reply");
const FreeBoard = require("./free_board");
const FreeReply = require("./free_reply");
const InactiveUser = require("./inactive_user");

const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};
db.sequelize = sequelize;

db.Authority = Authority;
db.ConditionUser = ConditionUser;
db.User = User;

db.TipBoard = TipBoard;
db.TipReply = TipReply;

db.QnaBoard = QnaBoard;
db.QnaReply = QnaReply;

db.FreeBoard = FreeBoard;
db.FreeReply = FreeReply;

db.Chatting = Chatting;

db.GameSkinProducts = GameSkinProducts;
db.GameSkinUser = GameSkinUser;
db.GameSkinWish = GameSkinWish;
db.PointTotal = PointTotal;
db.PointHistory = PointHistory;
db.PointType = PointType;

db.InactiveUser = InactiveUser;

// 테이블 생성
Authority.init(sequelize);
ConditionUser.init(sequelize);
User.init(sequelize);

TipBoard.init(sequelize);
TipReply.init(sequelize);

// FreeBoard.init(sequelize);
// FreeReply.init(sequelize);

Chatting.init(sequelize);

GameSkinProducts.init(sequelize);
GameSkinUser.init(sequelize);
GameSkinWish.init(sequelize);

PointTotal.init(sequelize);
PointHistory.init(sequelize);
PointType.init(sequelize);

QnaBoard.init(sequelize);
QnaReply.init(sequelize);

InactiveUser.init(sequelize);

// 테이블간의 관계 설정
Authority.associate(db);
ConditionUser.associate(db);
User.associate(db);

TipBoard.associate(db);
TipReply.associate(db);

// FreeBoard.associate(db);
// FreeReply.associate(db);

Chatting.associate(db);

GameSkinProducts.associate(db);
GameSkinUser.associate(db);
GameSkinWish.associate(db);

PointTotal.associate(db);
PointHistory.associate(db);
PointType.associate(db);

QnaBoard.associate(db);
QnaReply.associate(db);

InactiveUser.associate(db);

module.exports = db;
