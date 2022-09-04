const { PointTotal, User } = require("../model/index");

module.exports.findPoint = async (userId) => {
    try {
        return await User.findOne({
                                where : { userId }
        }).then((user) => {
            return PointTotal.findOne({
                                         attributes: ["point"],
                                         where : { userId : user.id }
                                      });
        });
    } catch (err) {
        console.error(err);
        return null;
    }
};