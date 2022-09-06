const { InactiveUser, User, sequelize } = require("../model");
const { CONDITION } = require("../config/config");

module.exports.findStopFewDays = async (userId) => {
    const user = await User.findOne({
                                        attributes : ["id"],
                                        where: { userId }
                                    });
    if (!user) return null;
    
    const result = await InactiveUser.findOne({
                                                attributes : ["stopFewDays"],
                                                where : { userId : user.id }
                                            })

    if(!result) return null;

    return result.dataValues.stopFewDays
}

module.exports.create = async (userId, days) => {
    const user = await User.findOne({
                                        attributes : ["id"],
                                        where: { userId }
                                    });
    if (!user) return false;
                                    
    return sequelize.transaction(async (t) => {
        const createResult = await InactiveUser.create({
                                                            userId : user.id,
                                                            stopFewDays : new Date(new Date().getTime() + days * 60 * 60 * 1000)
                                                        });

        const updateResult = await User.update({
                                                    conditionId : CONDITION.INACTIVITY
                                                },
                                                {
                                                    where : { userId }
                                                });
        if(createResult && updateResult) return true;
        else return false;
    });

    

}