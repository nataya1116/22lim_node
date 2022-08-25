const Sequelize = require("sequelize");

class QnaBoard extends Sequelize.Model {
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
        views: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        // 스네이크(ex user_date) 표기법으로 변경
        underscored: true,
        // 모델 이름 설정
        modelName: "QnaBoard",
        // 테이블 이름 설정
        tableName: "qna_board",
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
    db.QnaBoard.hasMany(db.TipReply, {
      foreignKey: "boardId",
      sourceKey: "id",
    });

    // N : 1
    db.QnaBoard.belongsTo(db.User, { foreignKey: "userId", sourceKey: "id" });
  }
}

module.exports = QnaBoard;
