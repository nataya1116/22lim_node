const { TipBoard, User, sequelize } = require("../model/index");
const Op = require("sequelize").Op;

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
                where : {
                    id
                }
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
                        'updatedAt',
                        'view'
                    ],
                    include: [
                           {
                            attributes : ['userId'],  
                            model : User 
                           }
                    ]
                    ,
                    order : [["id", "ASC"]],
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
                                    'updatedAt',
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
                                order : [["id", "ASC"]],
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
                        'updatedAt',
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
                    order : [["id", "ASC"]],
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
                        'updatedAt',
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
                    order : [["id", "ASC"]],
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