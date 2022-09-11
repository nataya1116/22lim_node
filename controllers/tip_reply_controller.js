const { TipReplyService } = require("../service");

module.exports.create = async (req, res) => {
    const { offset, userId, boardId, content } = req.body;
    console.log("create()", offset, userId, boardId, content);
    await TipReplyService.create({ userId, boardId, content });

    res.redirect("/tip_board/read/"+offset);
}

module.exports.createNested = async (req, res) => {
    const { offset, userId, boardId, replyId, content } = req.body;
    // console.log("createNested()",offset, userId, boardId, replyId, content);
    await TipReplyService.createNested({ userId, boardId, replyId, content });

    res.redirect("/tip_board/read/"+offset);
}

module.exports.update = async (req, res) => {
    const { offset, id, content } = req.body;
    await TipReplyService.update(id, content);

    res.redirect("/tip_board/read/"+offset);
}

// module.exports.updateView = async (req, res) => {
//     const { id, offset } = req.body;
    
//     res.render("tip_board_update");
// }

module.exports.delete = async (req, res) => {
    const id = Number(req.params.id);
    const offset = Number(req.params.offset);

    await TipReplyService.delete(id);

    res.redirect("/tip_board/read/"+offset);
}