const { InactiveUserService, TokenService } = require("../service");

module.exports.stopUser = async (req, res) => {
    const stopFewDays = Number(req.body.stop_few_days);
    const stopUserId = req.body.stop_user;

    const accessToken = req.session?.access_token;
    const User = TokenService.verifyAccessToken(accessToken);

    const result = await InactiveUserService.create(stopUserId, stopFewDays);

    if(result) {
        res.send("suc");
    } else {
        res.send("fail");
    }
}