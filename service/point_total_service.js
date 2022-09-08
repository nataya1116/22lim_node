const { PointTotal, User } = require("../model/index");

module.exports.findPoint = async (userId) => {
    try {
        const user = await User.findOne({
                                            where : { userId }
                                        });
        const reulst = await PointTotal.findOne({
                                                    attributes: ["point"],
                                                    where : { userId : user.id }
                                                });
        const point = reulst.dataValues.point;
        return point;
    } catch (err) {
        console.error(err);
        return null;
    }
};