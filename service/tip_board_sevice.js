const { TipBoard, TipReply, User, sequelize } = require("../model/index");
const Op = require("sequelize").Op;

module.exports.count = async () => {
    try {
        return TipBoard.count();
    } catch (err) {
        console.error(err);
    }
}

module.exports.create = async ({userId, title, content}) => {
    try {
        User.findOne({
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

module.exports.read = async (id) => {
    try {
        return TipBoard.findOne(
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

module.exports.view = async (offset) => {
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
                    ],
                    include: [
                           {
                            attributes : ['userId'],  
                            model : User 
                           }
                    ]
                    ,
                    order : [["id", "DESC"]],
                    offset,
                    limit
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
        TipBoard.update(
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
        TipBoard.increment(
            {
                view : 1
            },
            {
                where : { id }
            }
        )
    } catch (err) {
        console.error(err);
    }
}