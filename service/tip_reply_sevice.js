const { TipReply, User, sequelize } = require("../model/index");

module.exports.create = async ({userId, boardId, replyId, content}) => {
    try {
        User.findOne({
            where : { userId }
        }).then((user) => {
            TipReply.create(
                {
                    userId : user.id,
                    boardId, 
                    replyId,
                    content
                });
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports.list = async (boardId) => {
    try {
        return await TipReply.findAll(
                {
                    attributes : ['id', 'content', 'updatedAt'],
                    include: [
                        {
                         attributes : ['userId'],  
                         model : User }
                    ],
                    where : {
                        boardId
                    }
                }
            );
    } catch (err) {
        console.error(err);
    }
}

module.exports.update = async ({id, content}) => {
    try {
        TipReply.update(
            {
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
        TipReply.destroy(
            {
                where : { id }
            }
        )
    } catch (err) {
        console.error(err);
    }
}