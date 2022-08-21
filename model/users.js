const { Sequelize } = require("../modules/db");

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId : {
                    // 데이터 타입 설정
                    type : Sequelize.STRING(20),
                    // 널 값 허용 여부
                    allowNull : false,
                    // 고유값 여부
                    unique : true
                },
                userPw : {
                    type : Sequelize.STRING(30),
                    allowNull : false,
                },
                ninName : {
                    type : Sequelize.STRING(20),
                    allowNull : false,
                    unique : true
                },
                email : {
                    type : Sequelize.STRING(30),
                    allowNull : false,
                    unique : true
                },
                googleEmail : {
                    type : Sequelize.STRING(30),
                    allowNull : true,
                    unique : true
                },
                socketId : {
                    type : Sequelize.STRING(100),
                    allowNull : false
                },
                authorityId  : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                },
                refreshToken : {
                    type : Sequelize.STRING(100),
                    allowNull : true
                }
            },
            {
                sequelize,
                // 스네이크(ex user_date) 표기법으로 변경
                underscored : true,
                // 모델 이름 설정
                modelName : "User",
                // 테이블 이름 설정
                tableName : "users",
                // 생성 및 수정 컬럼 생성
                timestamps : true, 
                // 삭제 컬럼 생성
                paranoid : true,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }
}

module.exports = User;