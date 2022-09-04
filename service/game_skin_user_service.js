const { GameSkinUser, User, PointHistory, PointTotal, PointType, sequelize }= require("../model/index");
const { POINT } = require("../config/config");

module.exports.create = async (userId, productId, point) => {
    try {
        return await sequelize.transaction( async (t) => {
            const user = await User.findOne({
                                                where : { userId }
                                            });
            
            if(!user) return null;

            await GameSkinUser.create({
                                        userId : user.id, 
                                        productId
                                    },
                                    {
                                        transaction : t
                                    });
            
            const pointType = await PointType.findOne({
                                        where : {
                                          id : POINT.SKIN_BUY
                                        }
                                      });
            const point = pointType?.dataValues.point;
            const typeId = POINT.JOIN;
            
            await PointHistory.create({
                                        userId : user.id,
                                        typeId
                                    },
                                    {
                                        transaction: t
                                    });
            await PointTotal.increment({
                                            point
                                        },
                                        {
                                            where : { userId : user.id }
                                        },
                                        {
                                            transaction: t
                                        });
        });

        
    } catch (err) {
        console.error(err);
    }
}