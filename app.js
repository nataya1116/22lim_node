const { express, ejs, path, dot, session } = require("./modules/common");

dot.config();

// index.js에 정리한 객체들은 이렇게 폴더명만 써줘도 자동으로 index.js를 읽어온다.
// 이름이 무조건 index여야만 한다!
const { sequelize } = require("./model");

const userRouter = require("./routers/user_router");
const indexRouter = require("./routers/index_router");
const tipBoardRouter = require("./routers/tip_board_router");
const tipReplyRouter = require("./routers/tip_reply_router");
const skinProductsRouter = require("./routers/game_skin_products_router");
const skinWishRouter = require("./routers/game_skin_wish_router");

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
// 경로를 지정해주어 사용함!
// /tip_board라는 경로 내에 tipBoardRouter 요 안에 들어있는 get이나 post방식으로 접근한 모든 경로의 루트는 /tip_board로 설정해준것이다!
app.use("/tip_board", tipBoardRouter);
app.use("/tip_reply", tipReplyRouter);
app.use("/skin_products", skinProductsRouter);
app.use("/skin_wish", skinWishRouter);

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

// const TipBoardService = require("./service/tip_board_sevice");
// const TipReplyService = require("./service/tip_reply_sevice");

// app.get("/test", async (req, res) => {

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

// TipReplyService.delete(4);
// const count = await TipReplyService.readList(1);
// // console.log(count[0].updatedAt.getTime())
// res.send(count);
// res.render("board_list");
// });

// app.post("/emailCheck", (req, res) => {
//   let email = req.body.email;
//   req.session.email = email;
//   // console.log(email);
//   // result는 *전체 객체로 나오기 때문에 꼭!! 키에 접근을 해주어야한다.

//   sql.query("select * from users where email = ?", email, (err, result) => {
//     if (result[0] !== undefined) {
//       res.send("fail");
//     } else if (result[0] == undefined) {
//       let ranNum = randomNum();
//       req.session.randomNum = ranNum;
//       req.session.emailToken = jwt.sign({}, process.env.ET_SECRET_KEY, {
//         expiresIn: "3m",
//       });

//       let sendmail = {
//         // toEmail: email.email,
//         toEmail: email,
//         subject: `안녕하세요 22lim 인증번호입니다.`,
//         text: `${email}님 반갑습니다. 이메일 인증번호는 <h1>${ranNum}</h1> 입니다. 인증번호 칸에 입력 후 인증 확인 부탁드립니다.`,
//       };
//       mailer.emailSend(sendmail);
//       res.send("suc");
//     }
//   });
// });
