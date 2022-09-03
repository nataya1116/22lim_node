const Sequelize = require("sequelize");

class PointType extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                point : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                },
                reason : {
                    type : Sequelize.STRING,
                    allowNull : false
                },
                isPayment : {
                    type : Sequelize.BOOLEAN,
                    allowNull : false,
                }
            },
            {
                sequelize,
                underscored : true,
                modelName : "PointType",
                // 테이블 이름 설정
                tableName : "point_type",
                // 생성 및 수정 컬럼 생성
                timestamps : false, 
                // 삭제 컬럼 생성
                paranoid : false,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }

    static associate(db) {
        // 1 : N
        db.PointType.hasMany(db.PointHistory, { foreignKey: "typeId", sourceKey: "id" });
    }
}

module.exports = PointType;