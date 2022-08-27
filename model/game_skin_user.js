const Sequelize = require("sequelize");
const moment = require("moment");

class GameSkinUser extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId : {
                    type : Sequelize.INTEGER,
                    allowNull : false,
                },
                productId : {
                    type : Sequelize.INTEGER,
                    allowNull : false,
                },
                isUse : {
                    type : Sequelize.BOOLEAN,
                    allowNull : false,
                    defaultValue : false,
                },
                createdAt : {
                    type: Sequelize.DATE,
                    allowNull : false,             
                  get() {
                        return moment(this.getDataValue('createdAt')).format('YYYY/MM/DD h:mm:ss');
                    }
                },
                updatedAt : {
                    type: Sequelize.DATE,
                    allowNull : false,
                    get() {
                        return moment(this.getDataValue('updatedAt')).format('YYYY/MM/DD h:mm:ss');
                    }
                },
                deletedAt : {
                    type: Sequelize.DATE,
                    get() {
                        return moment(this.getDataValue('deletedAt')).format('YYYY/MM/DD h:mm:ss');
                    }
                }
            },
            {
                sequelize,
                underscored : true,
                modelName : "GameSkinUser",
                tableName : "game_skin_user",
                timestamps : true,
                paranoid : true,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }

    static associate(db) {
        // N : 1
        db.GameSkinUser.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
        db.GameSkinUser.belongsTo(db.GameSkinProducts, { foreignKey: "productId", targetKey: "id" });
    }
}

module.exports = GameSkinUser;