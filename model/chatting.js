const Sequelize = require("sequelize");
const moment = require("moment");

class Chatting extends Sequelize.Model {

    static init(sequelize){
        return super.init(
            {
                userId1 : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                },
                userId2 : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                },
                url : {
                    type : Sequelize.STRING,
                    allowNull : false
                },
                createdAt : {
                    type: Sequelize.DATE,
                    allowNull : false,             
                  get() {
                        return moment(this.getDataValue('createdAt')).format('YYYY/MM/DD hh:mm:ss');
                    }
                },
                updatedAt : {
                    type: Sequelize.DATE,
                    allowNull : false,
                    get() {
                        return moment(this.getDataValue('updatedAt')).format('YYYY/MM/DD hh:mm:ss');
                    }
                },
                deletedAt : {
                    type: Sequelize.DATE,
                    get() {
                        return moment(this.getDataValue('deletedAt')).format('YYYY/MM/DD hh:mm:ss');
                    }
                }
            },
            {
                sequelize,
                underscored : true,
                modelName : "Chatting",
                tableName : "chatting",
                timestamps : true,
                paranoid : true,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }

    static associate(db) {
        // N : 1
        db.Chatting.belongsTo(db.User, { foreignKey: "userId1", targetKey: "id" });
        db.Chatting.belongsTo(db.User, { foreignKey: "userId2", targetKey: "id" });
    }
}

module.exports = Chatting;