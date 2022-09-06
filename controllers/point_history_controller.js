const { PointHistory, TokenService } = require("../service");

module.exports.list = async (req, res) => {
    const accessToken = req.session?.access_token;
    const User = TokenService.verifyAccessToken(accessToken);

    if(!User){
        res.redirect("/user/login");
    }

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "10");
    //
    let offset = 0;

    if (pageNum > 1) {
        offset = limit * (pageNum - 1);
    }
    
    const result = await PointHistory.findHistory(User.userId, offset, limit);
    console.log(result);
    const list = result?.rows;
    const postNum = result?.count;
    const totalPage = Math.ceil(postNum / limit);

    res.render("point_history", { User, list , totalPage , pageNum, limit });
    // res.send(list);
}

module.exports.listIsPayment = async (req, res) => {
    const accessToken = req.session?.access_token;
    const User = TokenService.verifyAccessToken(accessToken);

    if(!User){
        res.redirect("/user/login");
    }

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "10");
    //
    let offset = 0;

    if (pageNum > 1) {
        offset = limit * (pageNum - 1);
    }

    let isPayment;

    if(req.params.isPayment == 1) isPayment = true;
    else isPayment = false;


    const result = await PointHistory.findHistoryIsPayment(User.userId, isPayment, 0, 1000);
    const list = result?.rows;
    const postNum = result?.count;
    const totalPage = Math.ceil(postNum / limit);

    res.render("point_history", { User, list , totalPage , pageNum, limit });
    // console.log(result);
    // res.send(list);
}