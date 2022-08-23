const Sequelize = require("sequelize");

class TipReply extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                content : {
                    type : Sequelize.TEXT,
                    allowNull : false
                },
                userId : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                },
                boardId : {
                    type : Sequelize.INTEGER,
                    allowNull : true
                },
                replyId : {
                    type : Sequelize.INTEGER,
                    allowNull : true
                },
            },
            {
                sequelize,
                // 스네이크(ex user_date) 표기법으로 변경
                underscored : true,
                // 모델 이름 설정
                modelName : "TipReply",
                // 테이블 이름 설정
                tableName : "tip_reply",
                // 생성 및 수정 컬럼 생성
                timestamps : true, 
                // 삭제 컬럼 생성
                paranoid : true,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }

    static associate(db) {
        // N : 1
        db.TipReply.belongsTo(db.User, { foreignKey: "userId", sourceKey: "id" });
        db.TipReply.belongsTo(db.TipBoard, { foreignKey: "boardId", sourceKey: "id" });
        db.TipReply.belongsTo(db.TipReply, { foreignKey: "replyId", sourceKey: "id"});

        // 1 : N
        db.TipReply.hasMany(db.TipReply, { foreignKey: "replyId", sourceKey: "id"});
      }
}

module.exports = TipReply;