const TipBoardService = require("../service/tip_board_sevice");
const TipReplyService = require("../service/tip_reply_sevice");

module.exports.list = async (req, res) => {
    console.log("c list()");
    const pageNum = Number(req.params.page || '1');
    const limit = Number(req.params.perPage || '10');
    let offset = 0;
    
    if( pageNum > 1 ) {
        offset = 10 * (pageNum - 1);
    }
    const result = await TipBoardService.list(offset, limit);
    console.log(result);
    const list = result.rows
    const postNum = result.count;
    const totalPage = Math.ceil( postNum / limit );

    const searchKey = '';
    const searchWord = '';
    res.render( "tip_board_list", { list , totalPage , pageNum, limit, searchKey, searchWord });
}

module.exports.listSearch = async (req, res) => {
    console.log("c listSearch()");
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
    console.log(result);
    const list = result.rows;
    const postNum = result.count;

    const totalPage = Math.ceil( postNum / limit );

    res.render( "tip_board_list", { list , totalPage , pageNum, limit, searchKey, searchWord });

}

module.exports.view = async (req, res) => {
    const offset  = Number(req.params.offset);
    const result = await TipBoardService.view(offset);
    
    const post = result[0];
        console.log(post);
    const id = post.dataValues.id;


    const postNum = await TipBoardService.count();
    const reply = await TipReplyService.list(id);

    // res.render("tip_board_view", { post, postNum, reply, offset });

    //                                                           임시로 아이디 값 삽입
    res.render("tip_board_view", { id, offset, post, postNum, reply, offset, userId : "temp" });
}

module.exports.update = async (req, res) => {
    const { id, offset } = req.body;
    
}

module.exports.delete = async (req, res) => {
    const id = Number(req.params.id);
    await TipBoardService.delete(id);

    res.redirect("/tip_board/list/1/10");
}