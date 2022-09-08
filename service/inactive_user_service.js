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

module.exports.create = async (userId, stopFewDays) => {
    try {
        const user = await User.findOne({
            attributes : ["id"],
            where: { userId }
        });
        if (!user) return false;
                               
  
        await InactiveUser.create({
                                    userId : user.id,
                                    stopFewDays,
                                });

        await User.update({
                            conditionId : CONDITION.INACTIVITY
                        },
                        {
                            where : { userId }
                        });  
                        
        return await User.count({
            where : { userId, conditionId : CONDITION.INACTIVITY }
        })
     
    } catch (err) {
        console.log(err);
        return false;
    }

    

}