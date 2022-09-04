const SkinProductsService = require("../service/game_skin_products_service");
const TokenService = require("../service/token_service");

module.exports.list = async (req, res) => {
    const accessToken = req.session?.access_token;
    const User = TokenService.verifyAccessToken(accessToken);

    const result = await SkinProductsService.list(0, 1000);
    const list = result?.rows;
    // console.log(list);
    res.render("skin_list", { User, list });
};