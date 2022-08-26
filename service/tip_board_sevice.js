const { TipBoard, User } = require("../model/index");

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

module.exports.readList = async (offset, limit) => {
    try {
        return await TipBoard.findAll(
                {
                    
                    attributes : ['id', 'title', 'updatedAt', 'views'],
                    include: [
                           {
                            attributes : ['userId'],  
                            model : User }
                        ]
                    ,
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