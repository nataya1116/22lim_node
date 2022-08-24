const Sequelize = require("sequelize");

const config = require("../config/config");
 
const User = require("./users");
const Authority = require("./authority");
const TipBoard = require("./tip_board");
const TipReply = require("./tip_reply");
const Chatting = require("./chatting");
const GameSkinProducts = require("./game_skin_products");
const GameSkinUser = require("./game_skin_user");
const GameSkinWish = require("./game_skin_wish");
const PointTotal = require("./point_total");

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
db.GameSkinUser = GameSkinUser;
db.GameSkinWish = GameSkinWish;
db.PointTotal = PointTotal;

// 테이블 생성
Authority.init(sequelize);
User.init(sequelize);
TipBoard.init(sequelize);
TipReply.init(sequelize);
Chatting.init(sequelize);
GameSkinProducts.init(sequelize);
GameSkinUser.init(sequelize);
GameSkinWish.init(sequelize);
PointTotal.init(sequelize);

// 테이블간의 관계 설정
Authority.associate(db)
User.associate(db);
TipBoard.associate(db);
TipReply.associate(db);
Chatting.associate(db);
GameSkinProducts.associate(db);
GameSkinUser.associate(db);
GameSkinWish.associate(db);
PointTotal.associate(db);

module.exports = db;