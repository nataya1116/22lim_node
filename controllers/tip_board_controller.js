const TipBoardService = require("../service/tip_board_sevice");
const TipReplyService = require("../service/tip_reply_sevice");

module.exports.list = async (req, res) => {

    const pageNum = await Number(req.params.page || '1');
    const limit = await Number(req.params.perPage || '10');
    let offset = 0;
    
    if( pageNum > 1 ) {
        offset = 10 * (pageNum - 1);
    }

    console.log("typeof limit ",typeof(limit));
    const list = await TipBoardService.list(offset, limit);
    const postNum = await TipBoardService.count();
    const totalPage = await  Math.ceil( postNum / limit );


    console.log("pageNum ", pageNum);
    console.log("limit ", limit);
    console.log("offset ", offset);
    console.log("postNum ", postNum);
    console.log("totalPage ", totalPage);

    res.render( "tip_board_list", { list , totalPage , pageNum, limit });
    // res.redirect("/");
}