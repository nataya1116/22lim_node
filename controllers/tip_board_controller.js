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
    const result = await TipBoardService.viewOffset(offset);
    
    const post = result[0];
    const id = post.dataValues.id;

    console.log(post);
    const postNum = await TipBoardService.count();
    const replyList = await TipReplyService.list(id);

    // res.render("tip_board_view", { post, postNum, replyList, offset });

    //                                                           임시로 아이디 값 삽입
    res.render("tip_board_view", { offset, post, postNum, replyList, offset, userId : "temp" });
}

module.exports.update = async (req, res) => {
    const id = Number(req.body.id);
    const offset= Number(req.body.offset);
    const { title, content } = req.body;

    await TipBoardService.update({id, title, content});

    res.redirect("/tip_board/read/"+offset);
}

module.exports.updatePrint = async (req, res) => {
    const id = Number(req.params.id);
    const offset= Number(req.params.offset);
    // console.log(id, offset);
    const post = await TipBoardService.viewId(id);
    // const post = result[0];
    // console.log(result);
    res.render("tip_board_update", { offset, post, userId : "temp" });
}

module.exports.delete = async (req, res) => {
    const id = Number(req.params.id);
    await TipBoardService.delete(id);

    res.redirect("/tip_board/list/1/10");
}