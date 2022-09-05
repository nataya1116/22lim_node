const { GameSkinWishService } = require("../service");

module.exports.create = async (req, res) => {
    
    const userId = req.body.userId;
    const productId = Number(req.body.productId);
    
    const result = await GameSkinWishService.create(userId, productId);
    
    // console.log(result);
    
    res.send(result);
};

module.exports.delete = async (req, res) => {

    const productWishId = Number(req.body.productWishId);

    const result = await GameSkinWishService.delete(productWishId);

    if(result){
        res.send("suc");
    } else {
        res.send("fail");
    }

    
}