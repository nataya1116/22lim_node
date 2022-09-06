const { UserService,
        TokenService} = require("../service");

module.exports.listUser = async (req, res) => {
    const accessToken = req.session?.access_token;
    const User = TokenService.verifyAccessToken(accessToken);

    const result = await UserService.listUsers(0, 1000);


    res.send(result);
} 