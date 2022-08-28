const { TipBoard, User, sequelize } = require("../model/index");
const Op = sequelize;

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

module.exports.list = async (offset, limit) => {
    console.log("서비스 list() 호출 ");
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
                    order : [["createdAt", "ASC"]],
                    offset,
                    limit
                }
            );
    } catch (err) {
        console.error(err);
    }
}

module.exports.listSearchUserId = async (offset, limit, userId) => {
    console.log("list() limit ", limit);
    try {
        return await User.findOne(
                        {
                            attributes : [ 'id' ],
                            where : {
                                userId
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
                                order : [["createdAt", "ASC"]],
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
    console.log("list() limit ", limit);
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
                    order : [["createdAt", "ASC"]],
                    offset,
                    limit
                    
                }
            );
    } catch (err) {
        console.error(err);
    }
}

module.exports.listSearchContent = async (offset, limit, searchWord) => {
    console.log("list() limit ", limit);
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
                    order : [["createdAt", "ASC"]],
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
        TipBoard.destroy(
            {
                where : { id }
            }
        )
    } catch (err) {
        
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