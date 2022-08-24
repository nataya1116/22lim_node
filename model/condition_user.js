const Sequelize = require("sequelize");

class ConditionUser extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                name : {
                    type : Sequelize.STRING(30),
                    allowNull : false
                }
            },
            {
                sequelize,
                underscored : true,
                modelName : "ConditionUser",
                tableName : "condition_user",
                timestamps : false,
                paranoid : false,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }

    static associate(db) {
        // 1 : N
        db.ConditionUser.hasMany(db.User, { foreignKey: "conditionId", sourceKey: "id" });
    }
}

module.exports = ConditionUser;