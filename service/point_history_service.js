const { PointHistory, PointType, User } = require("../model");

module.exports.findHistory = async (userId, offset, limit) => {
    try {
        const user = await User.findOne({
                                            where : { userId }
                                        });
        return await PointHistory.findAndCountAll({
                                            attributes: ["createdAt"],
                                            include : [{
                                                attributes : ["point", "reason"],
                                                model : PointType
                                            }],
                                            where : { userId : user.id },
                                            order: [["id", "DESC"]],
                                            limit,
                                            offset
                                        });
    } catch (err) {
        console.error(err);
        return null;
    }
};

// module.exports.count = asy

module.exports.findHistoryIsPayment = async (userId, isPayment, offset, limit) => {
    try {
        const user = await User.findOne({
                                            where : { userId }
                                        });
        return await PointHistory.findAndCountAll({
                                            attributes: ["createdAt"],
                                            include : [{
                                                attributes : ["point", "reason"],
                                                model : PointType,
                                                where : { isPayment }
                                            }],
                                            where : { userId : user.id },
                                            order: [["id", "DESC"]],
                                            limit,
                                            offset
                                        });
    } catch (err) {
        console.error(err);
        return null;
    }
}