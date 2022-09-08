const Sequelize = require("sequelize");
const moment = require("moment");

class QnaReply extends Sequelize.Model {
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
              "YYYY/MM/DD HH:mm:ss"
            );
          },
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          get() {
            return moment(this.getDataValue("updatedAt")).format(
              "YYYY/MM/DD HH:mm:ss"
            );
          },
        },
        deletedAt: {
          type: Sequelize.DATE,
          get() {
            return moment(this.getDataValue("deletedAt")).format(
              "YYYY/MM/DD HH:mm:ss"
            );
          },
        },
      },
      {
        sequelize,
        // 스네이크(ex user_date) 표기법으로 변경
        underscored: true,
        // 모델 이름 설정
        modelName: "QnaReply",
        // 테이블 이름 설정
        tableName: "qna_reply",
        // 생성 및 수정 컬럼 생성
        timestamps: true,
        // 삭제 컬럼 생성
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // N : 1
    db.QnaReply.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
    db.QnaReply.belongsTo(db.QnaBoard, {
      foreignKey: "boardId",
      targetKey: "id",
    });
    db.QnaReply.belongsTo(db.QnaReply, {
      foreignKey: "replyId",
      targetKey: "id",
    });

    // 1 : N
    db.QnaReply.hasMany(db.QnaReply, {
      foreignKey: "replyId",
      sourceKey: "id",
    });
  }
}

module.exports = QnaReply;
