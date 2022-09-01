const SkinProductsService = require("../service/game_skin_products_service");

module.exports.list = async (req, res) => {
    const result = await SkinProductsService.list(0, 1000);
    const list = result?.rows;
    res.send(list);
};