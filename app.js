const { express, ejs, path, dot, session } = require("./modules/common");

dot.config();

const { sequelize } = require("./model");

const userRouter = require("./routers/user_router");
const indexRouter = require("./routers/index_router");

const app = express();

const PORT = 4000;

// 뷰 폴더 내의 html을 views 절대 경로로 호출할 수 있게 처리
app.set("views", path.join(__dirname, "view"));

// html의 뷰 엔진을 ejs 랜더링 방식으로 바꾼다.
app.engine("html", ejs.renderFile);

// 뷰 엔진 설정을 html을 랜더링 할때 사용 하겠다.
app.set("view engine", "html");

app.use(express.urlencoded({ extended : false }));

// public 폴더 내의 폴더 및 파일들의 경로를 절대경로로 호출할 수 있게 처리
app.use(express.static('public'));

app.use(
    session({
        secret : process.env.SESSION_KEY,
        // 저장된 세션을 불러올 때 재 저장 여부
        resave : false,
        // 세션에 저장할 때 초기화 여부
        saveUninitialized : true
    })
)


// 라우터 사용 설정
app.use(userRouter);
app.use(indexRouter);

app.listen(PORT, () => {
    console.log(PORT,"번 포트 대기 중");
})

sequelize
.sync({focus : true})
.then(() => {
    console.log("DB 연결 성공...");
})
.catch((err) => {
    console.error(err);
})


const TipBoardService = require("./service/tip_board_sevice");

app.get("/test", async (req, res) => {

    // await TipBoardService.create({
    //     userId : "tt",
    //     title : "tqtqtq",
    //     content : "tqtqtqtertqter"
    // })
    // await TipBoardService.update({
    //     id : 1,
    //     title : "tqtqtq",
    //     content : "tqtqtqtertqter"
    // })
    await TipBoardService.delete(
        5
    )
    const count = await TipBoardService.readList(0, 10);
    console.log(count[0].updatedAt.getTime())
    res.send(count);
});