const Sequelize = require("sequelize");

class PointTotal extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                userId : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                },
                point : {
                    type : Sequelize.INTEGER,
                    defaultValue : 0
                }
            },
            {
                sequelize,
                underscored : true,
                // 모델 이름 설정
                modelName : "PointTotal",
                // 테이블 이름 설정
                tableName : "point_total",
                // 생성 및 수정 컬럼 생성
                timestamps : true, 
                // 삭제 컬럼 생성
                paranoid : true,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }

    static associate(db){
        // 1 : 1
        db.PointTotal.belongsTo(db.User, {foreignKey: "userId", targetKey: "id"});
    }
}

module.exports = PointTotal;