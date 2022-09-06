const { GameSkinWish, User }= require("../model/index");

module.exports.create = async (userId, productId) => {
    try {
        const user = await User.findOne({
                                            where : { userId }
                                        });

        // 생성 전에 기존 데이터가 존재하는지 확인한다면 복구해준다.
        // restore() 함수는 soft delete된 row를 복구(deletedAt 컬럼의 값을 null로 업데이트)
        // 리턴 값은 restore()로 처리된 row의 갯수
        const skinWish = await GameSkinWish.restore({
                                                        where : { 
                                                            userId : user.id,
                                                            productId 
                                                        }
                                                    });
            
        if(skinWish == 0){
            return await GameSkinWish.create({
                                                userId : user.id, 
                                                productId
                                            });
        } else {
            // updatedAt 시간을 업데이트 하기 위해....
            const tmp = await GameSkinWish.update({
                                                    // updatedAt : new Date()
                                                    productId
                                                },
                                                {
                                                    where : { 
                                                        userId : user.id,
                                                        productId 
                                                    }
                                                });
            return await GameSkinWish.findOne({
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
    return await GameSkinWish.destroy({
                            where : {
                                id
                            }
                        });
}

module.exports.count = async (userId) => {
    try {
      const user = await User.findOne({
                                        where : { userId }
                                    });
      return await GameSkinWish.count({
                                        where : { userId : user.id }
                                    });
    } catch (err) {
      console.error(err);
      return false;
    }
}