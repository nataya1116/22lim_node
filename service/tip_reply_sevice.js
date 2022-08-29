const { TipReply, User, sequelize } = require("../model/index");
const Op = require("sequelize").Op;

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
                    attributes : ['id', 'replyId', 'content', 'createdAt'],
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
                where : { 
                    [Op.or] : [{
                        id
                    },{
                        replyId : id // 댓글이 삭제되면 해당 대댓글도 삭제
                    }]
                }
            }
        )
    } catch (err) {
        console.error(err);
    }
}

module.exports.deletePost = async (boardId) => {
    try {
        TipReply.destroy(
            {
                where : { 
                    boardId
                }
            }
        )
    } catch (err) {
        console.error(err);
    }
}