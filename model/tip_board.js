const Sequelize = require("sequelize");
const moment = require("moment");

class TipBoard extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          // 데이터 타입 설정
          type: Sequelize.STRING(200),
          // 널 값 허용 여부
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        view: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          get() {
            return moment(this.getDataValue("createdAt")).format("YYYY/MM/DD HH:mm:ss");
          },
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
        modelName: "TipBoard",
        // 테이블 이름 설정
        tableName: "tip_board",
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
    // 1 : N
    db.TipBoard.hasMany(db.TipReply, {
      foreignKey: "boardId",
      sourceKey: "id",
    });

    // N : 1
    db.TipBoard.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
  }
}

module.exports = TipBoard;
