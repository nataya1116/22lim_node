const { GameSkinUser, User, PointHistory, PointTotal, PointType, sequelize, GameSkinProducts }= require("../model");
const { POINT } = require("../config/config");

module.exports.create = async (userId, productId) => {
    try {

        const user = await User.findOne({
                                            where : { userId }
                                        });

        if(!user) return false;

        return await sequelize.transaction( async (t) => {


            let skinUser = await GameSkinUser.findOne({
                                                        where : { 
                                                            userId : user.id,
                                                            productId 
                                                        }
                                                    });
            if(skinUser) return false;

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
            
            await PointHistory.create({
                                        userId : user.id,
                                        typeId : POINT.SKIN_BUY
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
            return true;
        });
        
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports.findOne = async (userId) => {
    try {
        const user = await User.findOne({
            where : { userId }
        });

        return await GameSkinUser.findOne({   
                                            include : {
                                                attributes : ["name", "info", "imgUrl", "positionX", "positionY"],
                                                model: GameSkinProducts,
                                            },
                                            attributes : ["productId"],
                                            where : { 
                                                userId : user.id,
                                                isUse : true 
                                            }
                                        });

    } catch (err) {
        console.error(err);
    }
}

module.exports.use = async (userId, productId, isUse) => {
    try {
            const user = await User.findOne({
                                                where : { userId }
                                            });

            if(!user) return false;

            await sequelize.transaction( async (t) => {
                // 기존의 사용한다고 설정된 값을 업데이트
                await GameSkinUser.update({
                                            isUse : false
                                        },
                                        {
                                            where : {
                                                userId : user.id,
                                                isUse
                                            }
                                        },
                                        {
                                            transaction: t
                                        });
                // 스킨 사용 설정 업데이트
                await GameSkinUser.update({
                                            isUse
                                        },
                                        {
                                            where : {
                                                userId : user.id,
                                                productId
                                            }
                                        },
                                        {
                                            transaction: t
                                        });
            });

            const skinUser = await GameSkinUser.findOne({
                                                            attributes : ["isUse"],
                                                            where : { 
                                                                userId : user.id,
                                                                productId 
                                                            }
                                                        });
            if(skinUser?.isUse) return true;
            else return false
    } catch (err) {
        console.error(err);

    }

}

module.exports.count = async (userId) => {
    try {
      const user = await User.findOne({
                                        where : { userId }
                                    });
      return await GameSkinUser.count({
                                        where : { userId : user.id }
                                    });
    } catch (err) {
      console.error(err);
      return false;
    }
}