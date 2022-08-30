const TipReplyService = require("../service/tip_reply_sevice");

module.exports.create = async (req, res) => {
    const { offset, userId, boardId, content } = req.body;

    await TipReplyService.create({ userId, boardId, content });

    res.redirect("/tip_board/read/"+offset);
}

module.exports.createNested = async (req, res) => {
    const { offset, userId, boardId, replyId, content } = req.body;
    console.log(userId, boardId, replyId, content);
    await TipReplyService.createNested({ userId, boardId, replyId, content });

    res.redirect("/tip_board/read/"+offset);
}

module.exports.updatePrint = async (req, res) => {
    const { id, offset } = req.body;
    
    res.render("tip_board_update");
}

module.exports.delete = async (req, res) => {
    const id = Number(req.params.id);
    const offset = Number(req.params.offset);

    await TipReplyService.delete(id);

    res.redirect("/tip_board/read/"+offset);
}