const TipReplyService = require("../service/tip_reply_sevice");

module.exports.create = async (req, res) => {
    const { offset, userId, boardId, replyId, content } = req.body;

    await TipReplyService.create({ userId, boardId, replyId, content });

    res.redirect("/read/"+offset);
}


module.exports.updatePrint = async (req, res) => {
    const { id, offset } = req.body;
    
    res.render("tip_board_update");
}

module.exports.delete = async (req, res) => {
    const id = Number(req.params.id);
    await TipReplyService.delete(id);

    res.redirect("/tip_board/list/1/10");
}