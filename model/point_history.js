const Sequelize = require("sequelize");

class PointHistory extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                },
                typeId : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                }
            },
            {
                sequelize,
                underscored : true,
                modelName : "PointHistory",
                tableName : "point_history",
                timestamps : true,
                paranoid : false,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }
    static associate(db){
        // N : 1
        db.PointHistory.belongsTo(db.User, { foreignKey: "authorityId", targetKey: "id" });
        db.PointHistory.belongsTo(db.PointType, { foreignKey: "typeId", targetKey: "id" });
    }
}

module.exports = PointHistory;