const QnaReplyService = require("../service/qna_reply_service");

module.exports.create = async (req, res) => {
  const { offset, userId, boardId, content } = req.body;
  await QnaReplyService.create({ userId, boardId, content });

  res.redirect("/qna_board/read/" + offset);
};

module.exports.createNested = async (req, res) => {
  const { offset, userId, boardId, replyId, content } = req.body;
  // console.log("createNested()",offset, userId, boardId, replyId, content);
  await QnaReplyService.createNested({ userId, boardId, replyId, content });

  res.redirect("/qna_board/read/" + offset);
};

module.exports.update = async (req, res) => {
  const { offset, id, content } = req.body;
  await QnaReplyService.update(id, content);

  res.redirect("/qna_board/read/" + offset);
};

// module.exports.updatePrint = async (req, res) => {
//     const { id, offset } = req.body;

//     res.render("tip_board_update");
// }

module.exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  const offset = Number(req.params.offset);

  await QnaReplyService.delete(id);

  res.redirect("/qna_board/read/" + offset);
};
