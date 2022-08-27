const { TipBoard, User, sequelize } = require("../model/index");

module.exports.count = async () => {
    try {
         const result =  await TipBoard.findAndCountAll({});
        return result.count;
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

module.exports.list = async (offset, limit) => {
    try {
        return await TipBoard.findAll(
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
                    offset,
                    limit,
                    order : [["id", "ASC"]]
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