const { GameSkinProducts, GameSkinUser, GameSkinWish, User }= require("../model/index");

module.exports.create = async (userId, productId) => {
    try {
        const user = await User.findOne({
                                            where : { userId }
                                        });
        const skinWish = await GameSkinWish.findOne({
                                    where : { 
                                        userId : user.id,
                                        productId 
                                    }
                                });
        if(!skinWish){
            await GameSkinWish.create({
                                    userId : user.id, 
                                    productId
                                });
        } else {
            await GameSkinWish.update(
                                {
                                    deletedAt : null
                                },
                                {
                                    where : { 
                                        userId : user.id,
                                        productId 
                                    }
                                }
                            );
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports.delete = async ({id}) => {
    await GameSkinWish.destroy({
                            where : {
                                id
                            }
                        });
}