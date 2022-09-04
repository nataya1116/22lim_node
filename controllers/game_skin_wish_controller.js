const SkinWishService = require("../service/game_skin_wish_service");

module.exports.create = async (req, res) => {
    
    const userId = req.body.userId;
    const productId = Number(req.body.productId);
    
    const result = await SkinWishService.create(userId, productId);
    
    // console.log(result);
    
    res.send(result);
};

module.exports.delete = async (req, res) => {

    const productWishId = Number(req.body.productWishId);

    const result = await SkinWishService.delete(productWishId);

    res.send(result);
}