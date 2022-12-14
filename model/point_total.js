const Sequelize = require("sequelize");
const moment = require("moment");

class PointTotal extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                userId : {
                    type : Sequelize.INTEGER,
                    allowNull : false,
                    unique : true
                },
                point : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                },
                createdAt : {
                    type: Sequelize.DATE,
                    allowNull : false,             
                  get() {
                        return moment(this.getDataValue('createdAt')).format('YYYY/MM/DD HH:mm:ss');
                    }
                },
                updatedAt : {
                    type: Sequelize.DATE,
                    allowNull : false,
                    get() {
                        return moment(this.getDataValue('updatedAt')).format('YYYY/MM/DD HH:mm:ss');
                    }
                },
                deletedAt : {
                    type: Sequelize.DATE,
                    get() {
                        return moment(this.getDataValue('deletedAt')).format('YYYY/MM/DD HH:mm:ss');
                    }
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