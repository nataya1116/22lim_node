const { PointTotal, User } = require("../model/index");

module.exports.findPoint = async (userId) => {
    try {
        const user = await User.findOne({
                                            where : { userId }
                                        });
        return await PointTotal.findOne({
                                            attributes: ["point"],
                                            where : { userId : user.id }
                                        });
    } catch (err) {
        console.error(err);
        return null;
    }
};