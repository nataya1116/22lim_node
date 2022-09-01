const { express, ejs, path, dot, session } = require("./modules/common");

dot.config();

const { sequelize, QnaBoard } = require("./model");

const userRouter = require("./routers/user_router");
const indexRouter = require("./routers/index_router");
const tipBoardRouter = require("./routers/tip_board_router");
const tipReplyRouter = require("./routers/tip_reply_router");

const app = express();

const PORT = 4000;

// 뷰 폴더 내의 html을 views 절대 경로로 호출할 수 있게 처리
app.set("views", path.join(__dirname, "view"));

// 뷰 엔진 설정을 html을 랜더링 할때 사용 하겠다.
app.set("view engine", "html");

// html의 뷰 엔진을 ejs 랜더링 방식으로 바꾼다.
app.engine("html", ejs.renderFile);

app.use(express.urlencoded({ extended: false }));

// public 폴더 내의 폴더 및 파일들의 경로를 절대경로로 호출할 수 있게 처리
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_KEY,
    // 저장된 세션을 불러올 때 재 저장 여부
    resave: false,
    // 세션에 저장할 때 초기화 여부
    saveUninitialized: true,
  })
);

// 라우터 사용 설정
app.use(userRouter);
app.use(indexRouter);
app.use("/tip_board", tipBoardRouter);
app.use("/tip_reply", tipReplyRouter);

app.listen(PORT, () => {
  console.log(PORT, "번 포트 대기 중");
});

sequelize
  .sync({ focus: false })
  .then(() => {
    console.log("DB 연결 성공...");
  })
  .catch((err) => {
    console.error(err);
  });

const TipBoardService = require("./service/tip_board_sevice");
const TipReplyService = require("./service/tip_reply_sevice");

app.get("/board/q&a", (req, res) => {
  console.log("연결됨????");
  QnaBoard.findAll({})
    .then((data) => {
      console.log(data);
      res.render("qna_board_view", {
        Post: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/test", async (req, res) => {
  //   await TipBoardService.create({
  //         userId : "gg",
  //         title : "tqtqtq1",
  //         content : "tqtqtqtertqter"
  //     })
  //     await TipBoardService.create({
  //       userId : "gg",
  //       title : "tqtqtq2",
  //       content : "tqtqtqtertqter"
  //   })
  //   await TipBoardService.create({
  //     userId : "gg",
  //     title : "tqtqtq3",
  //     content : "tqtqtqtertqter"
  // })
  // await TipBoardService.create({
  //   userId : "gg",
  //   title : "tqtqtq4",
  //   content : "tqtqtqtertqter"
  // })
  // TipBoardService.update({
  //     id : 1,
  //     title : "tqtqtq",
  //     content : "tqtqtqtertqter"
  // })
  // await TipBoardService.delete(2);
  // const count = await TipBoardService.list(0, 10);

  // res.send(count);

  //   TipReplyService.create({
  //       userId : "gg",
  //       boardId : 1,
  //       replyId : null,
  //       content : "ㅅㄷㄳㅂㄷㅅㅄtqtqtqtertqter"
  //   }) ;

  //   TipReplyService.create({
  //     userId : "gg",
  //     boardId : 1,
  //     replyId : 2,
  //     content : "대댓글"
  // }) ;
  // TipReplyService.update({
  //     id : 1,
  //     content : "행복행복"
  // })

  await TipReplyService.delete(2);
  const count = await TipReplyService.list(1);
  res.send(count);
  // res.render("board_list");
});
