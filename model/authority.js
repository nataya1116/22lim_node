const Sequelize = require("sequelize");

class Authority extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                name : {
                    // 데이터 타입 설정
                    type : Sequelize.STRING(20),
                    // 널 값 허용 여부
                    allowNull : false,
                    // 고유값 여부
                    unique : true
                }
            },
            {
                sequelize,
                // 스네이크(ex user_date) 표기법으로 변경
                underscored : true,
                // 모델 이름 설정
                modelName : "Authority",
                // 테이블 이름 설정
                tableName : "authority",
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
        db.Authority.hasMany(db.User, { foreignKey: "authorityId", sourceKey: "id" });
    }
}

module.exports = Authority;