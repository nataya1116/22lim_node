const { TipReply, User, PointTotal, PointHistory, PointType, sequelize } = require("../model");
const Op = require("sequelize").Op;
const { POINT } = require("../config/config");

// TODO 포인트 추가해줄것
module.exports.create = async ({userId, boardId, content}) => {
    try {
        await sequelize.transaction( async (t) => {
            await User.findOne({
                                    where : { userId }
            }).then( async (user) => {
                await TipReply.create({
                                            userId : user.id,
                                            boardId, 
                                            content
                                        },
                                        {
                                            transaction: t
                                        });
                const pointType = await PointType.findOne({
                                                            where : {
                                                                id : POINT.WRITE_REPLY
                                                            }
                                                            });
                await PointHistory.create({
                                            userId : user.id,
                                            typeId : POINT.WRITE_REPLY
                                        },
                                        {
                                            transaction: t
                                        });
                await PointTotal.increment({
                                                point : pointType.point
                                            },
                                            {
                                                where : { userId : user.id }
                                            },
                                            {
                                                transaction: t
                                            });
            });
        });

    } catch (err) {
        console.error(err);
    }
}

// TODO 포인트 추가해줄것
module.exports.createNested = async ({userId, boardId, replyId, content}) => {
    try {
        await sequelize.transaction( async (t) => {
            await User.findOne({
                                    where : { userId }
            }).then( async (user) => {
                await TipReply.create({
                                            userId : user.id,
                                            boardId, 
                                            replyId,
                                            content
                                        },
                                        {
                                            transaction: t
                                        });
                const pointType = await PointType.findOne({
                                                            where : {
                                                                id : POINT.WRITE_REPLY
                                                            }
                                                            });
                await PointHistory.create({
                                            userId : user.id,
                                            typeId : POINT.WRITE_REPLY
                                        },
                                        {
                                            transaction: t
                                        });
                await PointTotal.increment({
                                                point : pointType.point
                                            },
                                            {
                                                where : { userId : user.id }
                                            },
                                            {
                                                transaction: t
                                            });
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

module.exports.update = async (id, content) => {
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