const { express, ejs, path } = require("./modules/common");

const { sequelize } = require("./model");

const userRouter = require("./routers/user_router");

const app = express();

const PORT = 4000;


app.use(express.urlencoded({extended : false}));

// public 폴더 내의 폴더 및 파일들의 경로를 절대경로로 호출할 수 있게 처리
app.use(express.static('public'));

// 뷰 폴더 내의 html을 views 절대 경로로 호출할 수 있게 처리
app.set("views", path.join(__dirname, "view"));


// 라우터 사용 설정
app.use(userRouter);

// html의 뷰 엔진을 ejs 랜더링 방식으로 바꾼다.
app.engine("html", ejs.renderFile);

app.listen(PORT, () => {
    console.log(PORT,"번 포트 대기 중");
})

sequelize
.sync({focus : false})
.then(() => {
    console.log("DB 연결 성공...");
})
.catch((err) => {
    console.error(err);
})