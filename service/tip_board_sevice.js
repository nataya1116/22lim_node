const { TipBoard, TipReply, User, sequelize } = require("../model/index");
const Op = require("sequelize").Op;

module.exports.count = async () => {
    try {
        return await TipBoard.count();
    } catch (err) {
        console.error(err);
    }
}

module.exports.create = async ({userId, title, content}) => {
    try {
        await User.findOne({
            where : { userId }
        }).then((user) => {
            TipBoard.create(
                {
                    userId : user.id, 
                    title, 
                    content
                });
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports.viewId = async (id) => {
    try {
        return await TipBoard.findOne(
            {
                include: [
                    {
                     attributes : ['userId'],  
                     model : User 
                    }
                ]
                ,where : {
                        id
                    }
            }
        )
    } catch (err) {
        console.error(err);
    }
}

module.exports.viewOffset = async (offset) => {
    try {
        return await TipBoard.findAll(
            {
                include: [
                    {
                        attributes : ['userId'],  
                        model : User 
                    }
                ],
                order : [["id", "DESC"]],
                offset,
                limit : 1
            }
        )
    } catch (err) {
        console.error(err);
    }
}

module.exports.list = async (offset, limit) => {
    try {
        return await TipBoard.findAndCountAll(
                {
                    
                    attributes : [
                        'id', 
                        'title',
                        'createdAt',
                        'view'
                    ]                    ,
                    order : [["id", "DESC"]],
                    offset,
                    limit,
                    include: [
                           {
                                attributes : ['userId'],  
                                model : User 
                           },
                        //    {
                        //         attributes :  [[sequelize.fn('COUNT', 'boardId'), 'replyCount']],
                        //         model : TipReply,                                
                        //    }
                    ]

                }
            );
    } catch (err) {
        console.error(err);
    }
}

module.exports.listSearchUserId = async (offset, limit, userId) => {
    console.log("s listSearchUserId");
    try {
        return await User.findOne(
                        {
                            attributes : [ 'id' ],
                            where : {
                                userId : {
                                    [Op.like] : `%${userId}%`
                                }
                            }
                        }

                    ).then((user) => {
                        return TipBoard.findAndCountAll(
                            {
                                
                                attributes : [
                                    'id', 
                                    'title',
                                    'createdAt',
                                    'view'
                                ],
                                include: [
                                    {
                                        attributes : ['userId'],  
                                        model : User 
                                    }
                                ]
                                ,
                                where : {
                                    userId : user.id
                                },
                                order : [["id", "DESC"]],
                                offset,
                                limit
                            }
                        );
                    });
        
    } catch (err) {
        console.error(err);
    }
}

module.exports.listSearchTitle = async (offset, limit, searchWord) => {
    console.log("s listSearchTitle");
    try {
        return await TipBoard.findAndCountAll(
                {
                    
                    attributes : [
                        'id', 
                        'title',
                        'createdAt',
                        'view'
                    ],
                    include: [
                           {
                            attributes : ['userId'],  
                            model : User 
                           }
                    ],
                    where : {
                        title : {
                            [Op.like] : `%${searchWord}%`
                        }
                    },
                    order : [["id", "DESC"]],
                    offset,
                    limit
                    
                }
            );
    } catch (err) {
        console.error(err);
    }
}

module.exports.listSearchContent = async (offset, limit, searchWord) => {
    console.log("s listSearchContent");
    try {
        return await TipBoard.findAndCountAll(
                {
                    
                    attributes : [
                        'id', 
                        'title',
                        'createdAt',
                        'view'
                    ],
                    include: [
                           {
                            attributes : ['userId'],  
                            model : User 
                           }
                    ],
                    where : {
                        content : {
                            [Op.like] : `%${searchWord}%`
                        }
                    },
                    order : [["id", "DESC"]],
                    offset,
                    limit
                    
                }
            );
    } catch (err) {
        console.error(err);
    }
}

module.exports.update = async ({id, title, content}) => {
    try {
        await TipBoard.update(
            {
                title, 
                content
            },
            {
                where : { 
                    id
                }
            }
        );
    } catch (err) {
        console.error(err);
    }
}


module.exports.delete = async (id) => {

    try {
        // 게시글이 삭제되면 댓글도 함께 삭제된다.
        await sequelize.transaction(async (t) => {

            TipBoard.destroy(
                {
                    where : { id },
                    transaction: t
                }
            );
            
        await TipReply.destroy(
                {
                    where : { boardId : id },
                    transaction: t
                }
            )

        });
    
    } catch (err) {
        console.log(err);
    }

}

module.exports.updateViewsCount = async (id) => {
    try {
        await TipBoard.increment(
            {
                view : 1
            },
            {
                where : { id }
            }
        ) // 누구보다 귀엽고 깜찍하고 사랑스러운 수진 언니 헤헤헤 우리 언니 항상 짱이다용 못 살아 언니 없인 못 살아 언니 항상 힘내요 언니는 늘 잘 하고 있지만 앞으로 더 잘 할 거고 승승장구 할 거에요 매력 덩어리 수진 언니 웃음 많은 갈매기를 품은 멋진 소녀이자 그 자체로 소중한 하나의 인격체이자 더할 나위 함께 하면 더욱 좋은 사람이자 내가 좋아하는 여자 사랑해요 히히히 울 언니 화이또 ♥
    } catch (err) {
        console.error(err);
    }
}


module.exports.create = async ({userId, title, content}) => {
    try {
        await TipBoard.create(
                {
                    userId,
	        title, 
                    content
                });
    } catch (err) {
        console.error(err);
    }
}