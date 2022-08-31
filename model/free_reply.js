const Sequelize = require("sequelize");
const moment = require("moment");

class FreeReply extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        boardId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        replyId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          get() {
            return moment(this.getDataValue("createdAt")).format(
              "YYYY/MM/DD hh:mm:ss"
            );
          },
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          get() {
            return moment(this.getDataValue("updatedAt")).format(
              "YYYY/MM/DD hh:mm:ss"
            );
          },
        },
        deletedAt: {
          type: Sequelize.DATE,
          get() {
            return moment(this.getDataValue("deletedAt")).format(
              "YYYY/MM/DD hh:mm:ss"
            );
          },
        },
      },
      {
        sequelize,
        underscored: true,
        modelName: "FreeReply",
        tableName: "free_reply",
        timestamps: true,
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // DB객체에 저장한 모델.belongsTo(값을 받아올 모델, {foreignKey : "", targetKey : ""})
    db.FreeReply.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
    db.FreeReply.belongsTo(db.FreeBoard, {
      foreignKey: "boardId",
      targetKey: "id",
    });
    // 아래의 hasMany()구문과 같은 테이블 내에서 서로를 참고 하고 있다.
    db.FreeReply.belongsTo(db.FreeReply, {
      foreignKey: "replyId",
      targetKey: "id",
    });

    // DB객체에 저장한 모델.hasMany(값을 뿌려줄 모델, {foreignKey : "", targetKey : ""})
    db.FreeReply.hasMany(db.FreeReply, {
      foreignKey: "replyId",
      targetKey: "id",
    });
  }
}

module.exports = FreeReply;
