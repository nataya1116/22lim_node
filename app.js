const { express, ejs, path, dot, session } = require("./modules/common");

dot.config();

// index.js에 정리한 객체들은 이렇게 폴더명만 써줘도 자동으로 index.js를 읽어온다.
// 이름이 무조건 index여야만 한다!
const { sequelize } = require("./model");

const userRouter = require("./routers/user_router");
const indexRouter = require("./routers/index_router");

const tipBoardRouter = require("./routers/tip_board_router");
const qnaBoardRouter = require("./routers/qna_board_router");
const freeBoardRouter = require("./routers/free_board_router");

const tipReplyRouter = require("./routers/tip_reply_router");
const qnaReplyRouter = require("./routers/qna_reply_router");
const skinProductsRouter = require("./routers/game_skin_products_router");
const skinWishRouter = require("./routers/game_skin_wish_router");
const skinUserRouter = require("./routers/game_skin_user_router");

const gameParanoia = require("./routers/game_paranoia_router");

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
app.use(indexRouter);
app.use("/user", userRouter);
// 경로를 지정해주어 사용함!
// /tip_board라는 경로 내에 tipBoardRouter 요 안에 들어있는 get이나 post방식으로 접근한 모든 경로의 루트는 /tip_board로 설정해준것이다!
app.use("/tip_board", tipBoardRouter);
app.use("/tip_reply", tipReplyRouter);
// app.use("/free_board", freeBoardRouter);
// app.use("/free_reply", freeReplyRouter);

app.use("/qna_board", qnaBoardRouter);
app.use("/qna_reply", qnaReplyRouter);

app.use("/skin_products", skinProductsRouter);
app.use("/skin_wish", skinWishRouter);
app.use("/skin_user", skinUserRouter);

app.use("/game_paranoia", gameParanoia);

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
