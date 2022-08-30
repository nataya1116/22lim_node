const Sequelize = require("sequelize");

class Writing extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        number: {
          // 데이터 타입 설정
          type: Sequelize.STRING(200),
          // 널 값 허용 여부
          allowNull: false,
        },
        title: {
          type: Sequelize.TEXT,
          allowNull: false,
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
              "YYYY/MM/DD hh:mm:ss"
            );
          },
        },
        view: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        // 스네이크(ex user_date) 표기법으로 변경
        underscored: true,
        // 모델 이름 설정
        modelName: "Writing",
        // 테이블 이름 설정
        tableName: "writing",
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
    db.Writing.hasMany(db.TipReply, {
      foreignKey: "boardId",
      sourceKey: "id",
    });
    // N : 1
    db.Writing.belongsTo(db.User, { foreignKey: "userId", sourceKey: "id" });
  }
}

module.exports = Writing;
