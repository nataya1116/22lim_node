const Sequelize = require("sequelize");
const moment = require("moment");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          // 데이터 타입 설정
          type: Sequelize.STRING(20),
          // 널 값 허용 여부
          allowNull: false,
          // 고유값 여부
          unique: true,
        },
        userPw: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        userName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(11),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        googleEmail: {
          type: Sequelize.STRING(30),
          allowNull: true,
          unique: true,
        },
        socketId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        refreshToken: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        authorityId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        conditionId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        lastLogin : {
          type: Sequelize.DATE,
          get() {
            return moment(this.getDataValue("lastLogin")).format("YYYY/MM/DD HH:mm:ss");
          }
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          get() {
            return moment(this.getDataValue("createdAt")).format("YYYY/MM/DD HH:mm:ss");
          }
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          get() {
            return moment(this.getDataValue("updatedAt")).format("YYYY/MM/DD HH:mm:ss");
          },
        },
        deletedAt: {
          type: Sequelize.DATE,
          get() {
            return moment(this.getDataValue("deletedAt")).format("YYYY/MM/DD HH:mm:ss");
          },
        },
      },
      {
        sequelize,
        // 스네이크(ex user_date) 표기법으로 변경
        underscored: true,
        // 모델 이름 설정
        modelName: "User",
        // 테이블 이름 설정
        tableName: "users",
        // 생성 및 수정 컬럼 생성(update_at을 로그인 시간으로 해도 될 듯)
        timestamps: true,
        // 삭제 컬럼 생성
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // 1 : N
    db.User.hasMany(db.TipBoard, { foreignKey: "userId", sourceKey: "id" });
    db.User.hasMany(db.TipReply, { foreignKey: "userId", sourceKey: "id" });

    db.User.hasMany(db.QnaBoard, { foreignKey: "userId", sourceKey: "id" });
    db.User.hasMany(db.QnaReply, { foreignKey: "userId", sourceKey: "id" });

    db.User.hasMany(db.GameSkinUser, { foreignKey: "userId", sourceKey: "id" });
    db.User.hasMany(db.GameSkinWish, { foreignKey: "userId", sourceKey: "id" });

    db.User.hasMany(db.Chatting, { foreignKey: "userId1", sourceKey: "id" });
    db.User.hasMany(db.Chatting, { foreignKey: "userId2", sourceKey: "id" });

    db.User.hasMany(db.PointHistory, { foreignKey: "userId", sourceKey: "id" });

    db.User.hasMany(db.InactiveUser, { foreignKey: "userId", sourceKey: "id" });
    
    // 1 : 1
    db.User.hasOne(db.PointTotal, { foreignKey: "userId", sourceKey: "id" });

    // N : 1
    db.User.belongsTo(db.Authority, { foreignKey: "authorityId", targetKey: "id" });
    db.User.belongsTo(db.ConditionUser, { foreignKey: "conditionId", targetKey: "id" });
  }
}

module.exports = User;
