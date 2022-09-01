const SkinWishService = require("../service/game_skin_wish_service");

module.exports.create = async (req, res) => {
    const userId = req.params.userId;
    const productId = Number(req.params.productId);
    
    await SkinWishService.create(userId, productId);
    
    res.redirect("/skin_products/list");
};