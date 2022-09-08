const Sequelize = require("sequelize");
const moment = require("moment");

class FreeBoard extends Sequelize.Model {
  // sequelize : static init 함수의 매개변수를 연결 시키는 옵션
  static init(sequelize) {
    return super.init(
      {
        // 컬럼에 대한 설정
        title: {
          // 데이터 타입 설정
          type: Sequelize.STRING(200),
          // null의 여부 설정
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        view: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
        // 스네이크 기법으로 변경 여부
        underscored: true,
        // 모델명 설정
        modelName: "FreeBoard",
        // 테이블명 설정
        tableName: "free_board",
        // 생성시간, 업데이트 시간 컬럼 생성해줌
        timestamps: true,
        // deletedAt 컬럼생성해준다
        // 시퀄라이즈에서 distroy는 sql의 delete와 다르다
        // 실제로 삭제는 되지 않고 삭제 시간이 있으면 브라우저 상에서는
        // 보이지 않고 DB에는 남아있다.
        paranoid: true,
        // 인코딩 방식 설정
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.FreeBoard.hasMany(db.FreeReply, {
      foreignKey: "userId",
      sourceKey: "id",
    });

    db.FreeBoard.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
  }
}

module.exports = FreeBoard;
