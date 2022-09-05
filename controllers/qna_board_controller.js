const { QnaBoardService, 
        QnaReplyService, 
        TokenService } = require("../service/index");

const { AUTHORITY, BOARDS } = require("../config/config");

module.exports.create = async (req, res) => {
  const { userId, title, content } = req.body;  
  console.log("c create() ", userId, title, content);
  await QnaBoardService.create({ userId, title, content });

  res.redirect("/qna_board/list/1/10");
};

module.exports.createView = (req, res) => {
  const accessToken = req.session?.access_token;
  const User = TokenService.verifyAccessToken(accessToken);
  
  res.render("qna_board_insert", {
    User,
    AUTHORITY,
    BOARDS,
    board: BOARDS.QNA_BOARD,
  });
};

// 게시판 목록 페이지 네이션을 동작하게 하는 부분(검색어가 없을 때)
module.exports.list = async (req, res) => {
  
  const accessToken = req.session?.access_token;
  const User = TokenService.verifyAccessToken(accessToken);

  // get방식으로 가져올 때는 req.parmas
  // post방식으로 가져올땐 req.body
  // parmas는 문자열로만 인식을 함! 그래서 타입캐스팅을 Number로 해준다
  // 몇번째 페이지인지
  const pageNum = Number(req.params.page || "1");
  // 게시판 글을 한 페이지에 몇개나 보여줄건지
  const limit = Number(req.params.perPage || "10");
  //
  let offset = 0;

  // 페이지에 목록 10개씩 보여주기 위해서 쓴 식임
  // 밑의 조건은 1 페이지를 넘어간 경우(왜냐믄 1페이지부터 -10을 해주면 안되니깡!~)
  if (pageNum > 1) {
    // 목록 개수 리미트 * 페이지 -1
    // EX) 10개라고 리미트를 정해주고 2페이지인 경우 1페이지에서 보여준 10개의 목록을 제외
    offset = limit * (pageNum - 1);
  }
  // 팁 보드 리스트
  const result = await QnaBoardService.list(offset, limit);
  // console.log(result);
  const list = result?.rows;
  const postNum = result?.count;
  const totalPage = Math.ceil(postNum / limit);

  const searchKey = "";
  const searchWord = "";

  res.render("qna_board_list", {
    User,
    list,
    totalPage,
    pageNum,
    limit,
    searchKey,
    searchWord,
  });
};

module.exports.listSearch = async (req, res) => {
  const accessToken = req.session?.access_token;
  const User = TokenService.verifyAccessToken(accessToken);

  const pageNum = Number(req.params.page || "1");
  const limit = Number(req.params.perPage || "10");
  const { searchKey, searchWord } = req.params;

  let offset = 0;

  if (pageNum > 1) {
    offset = limit * (pageNum - 1);
  }

  let result;

  switch (searchKey) {
    case "userId":
      result = await QnaBoardService.listSearchUserId(
        offset,
        limit,
        searchWord
      );
      break;
    case "title":
      result = await QnaBoardService.listSearchTitle(offset, limit, searchWord);
      break;
    case "content":
      result = await QnaBoardService.listSearchContent(
        offset,
        limit,
        searchWord
      );
      break;
    default:
      result = await QnaBoardService.list(offset, limit);
      break;
  }
  // console.log(result);
  const list = result?.rows;
  const postNum = result?.count;

  const totalPage = Math.ceil(postNum / limit);

  res.render("qna_board_list", {
    User,
    list,
    totalPage,
    pageNum,
    limit,
    searchKey,
    searchWord,
  });
};

module.exports.view = async (req, res) => {

  const accessToken = req.session?.access_token;
  const User = TokenService.verifyAccessToken(accessToken);

  const offset = Number(req.params.offset);
  const result = await QnaBoardService.viewOffset(offset);

  let post = result[0];
  post.dataValues.view++;
  const id = post.dataValues.id;

  // console.log(post);
  const postNum = await QnaBoardService.count();
  await QnaBoardService.updateViewsCount(id);

  const replyList = await QnaReplyService.list(id);

  //                                                           임시로 아이디 값 삽입
  res.render("qna_board_view", {
    User,
    offset,
    post,
    postNum,
    replyList,
    offset
  });
};

module.exports.update = async (req, res) => {
  const id = Number(req.body.id);
  const offset = Number(req.body.offset);
  const { title, content } = req.body;

  const result = await QnaBoardService.update({ id, title, content });

  res.redirect("/qna_board/read/" + offset);
};

module.exports.updatePrint = async (req, res) => {

  const accessToken = req.session?.access_token;
  const User = TokenService.verifyAccessToken(accessToken);
  
  const id = Number(req.params.id);
  const offset = Number(req.params.offset);
  // console.log(id, offset);
  const post = await QnaBoardService.viewId(id);
  // const post = result[0];
  // console.log(result);
  res.render("qna_board_update", { User, offset, post });
};

module.exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  await QnaBoardService.delete(id);

  res.redirect("/qna_board/list/1/10");
};
