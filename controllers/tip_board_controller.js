const TipBoardService = require("../service/tip_board_sevice");
const TipReplyService = require("../service/tip_reply_sevice");

module.exports.list = async (req, res) => {
    console.log("콘트롤러 list() 호출");
    const pageNum = Number(req.params.page || '1');
    const limit = Number(req.params.perPage || '10');
    let offset = 0;
    
    if( pageNum > 1 ) {
        offset = 10 * (pageNum - 1);
    }
    const result = await TipBoardService.list(offset, limit);

    const list = result.rows
    const postNum = result.count;
    const totalPage = Math.ceil( postNum / limit );

    res.render( "tip_board_list", { list , totalPage , pageNum, limit });
}

module.exports.listSearch = async (req, res) => {

    const pageNum = Number(req.params.page || '1');
    const limit = Number(req.params.perPage || '10');
    const { searchKey, searchWord } = req.params;

    let offset = 0;
    
    if( pageNum > 1 ) {
        offset = 10 * (pageNum - 1);
    }

    let result;

    switch (searchKey) {
        case "userId":
            result = await TipBoardService.listSearchUserId(offset, limit, searchWord);
            break;
        case "title":
            result = await TipBoardService.listSearchTitle(offset, limit, searchWord);
            break;
        case "content":
            result = await TipBoardService.listSearchContent(offset, limit, searchWord);
            break;
        default:
            result = await TipBoardService.list(offset, limit);
            break;
    }

    const list = result.rows;
    const postNum = result.count;

    const totalPage = Math.ceil( postNum / limit );

    res.render( "tip_board_list", { list , totalPage , pageNum, limit });
}


module.exports.test = async (req, res) => {
    console.log("콘트롤러 test() 호출");
    const count = await TipBoardService.list(0, 10);

    // res.send(count);
    res.render("index");
} 