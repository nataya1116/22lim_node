const { GameSkinUser, User }= require("../model/index");

module.exports.create = async (userId, productId) => {
    try {
        const user = await User.findOne({
            where : { userId }
        });

        // restore() 함수는 soft delete된 row를 복구(deletedAt 컬럼의 값을 null로 업데이트)
        // 리턴 값은 restore가 처리된 row의 갯수
        const skinWish = await GameSkinUser.restore({
                    where : { 
                        userId : user.id,
                        productId 
                    }
                });
            
        if(skinWish == 0){
            return await GameSkinUser.create({
                    userId : user.id, 
                    productId
                });
        } else {
            return await GameSkinUser.findOne({
                where : { 
                    userId : user.id,
                    productId 
                }
            });
        }
        
    } catch (err) {
        console.error(err);
    }
}

module.exports.delete = async (id) => {
    await GameSkinUser.destroy({
                            where : {
                                id
                            }
                        });
}