const SkinProductsService = require("../service/game_skin_products_service");

module.exports.list = async (req, res) => {
    const accessToken = req.session?.access_token;
    const User = TokenService.verifyAccessToken(accessToken);
    const userId = User?.userId;

    const result = await SkinProductsService.list(0, 1000);
    const list = result?.rows;

    res.render("skin_list", { userId, list });
};