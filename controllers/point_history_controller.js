const { PointHistoryService, PointTotalService, TokenService } = require("../service");

module.exports.list = async (req, res) => {
    const accessToken = req.session?.access_token;
    const User = TokenService.verifyAccessToken(accessToken);

    if(!User){
        res.redirect("/user/login");
    }

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "12");
    //
    let offset = 0;

    if (pageNum > 1) {
        offset = limit * (pageNum - 1);
    }
    
    const result = await PointHistoryService.findHistory(User.userId, offset, limit);
    console.log(result);
    const list = result?.rows;
    const postNum = result?.count;
    const totalPage = Math.ceil(postNum / limit);

    const point = await PointTotalService.findPoint(User.userId);

    const button = "all";

    res.render("point_history", { User, point, list , totalPage , pageNum, limit, button });
    // res.send(list);
}

module.exports.listIsPayment = async (req, res) => {
    const accessToken = req.session?.access_token;
    const User = TokenService.verifyAccessToken(accessToken);

    if(!User){
        res.redirect("/user/login");
    }

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "12");
    //
    let offset = 0;

    if (pageNum > 1) {
        offset = limit * (pageNum - 1);
    }

    let isPayment;

    if(req.params.isPayment == 1) isPayment = true;
    else isPayment = false;


    const result = await PointHistoryService.findHistoryIsPayment(User.userId, isPayment, offset, limit);
    const list = result?.rows;
    const postNum = result?.count;
    const totalPage = Math.ceil(postNum / limit);

    
    const point = await PointTotalService.findPoint(User.userId);

    const button = isPayment ? "spends" : "receive";

    res.render("point_history", { User, point, list , totalPage , pageNum, limit, button });
}