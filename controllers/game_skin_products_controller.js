const SkinProductsService = require("../service/game_skin_products_service");
const UserService = require("../service/user_service");
const TokenService = require("../service/token_service");

module.exports.list = async (req, res) => {
    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    if(User){
        User = await UserService.findUser(User.userId);
    }

    const result = await SkinProductsService.list(0, 1000);
    const list = result?.rows;
    // console.log(list);
    res.render("skin_list", { User, list });
};