const { express, fs, path, ejs } = require("../modules/common");

const router = express.Router();

const app = express();

// path.join함수는 매개변수를 받은 문자열들을 주소처럼 합쳐줌
// path.join('a','b') = a/b 주소처럼 만들어줌
// app2.js가 있는 위치 __dirname
// views 폴더까지의 경로가 기본값 렌더링할 파일을 모아둔 폴더
// app.set express에 값을 저장가능 밑에 구문은 views키에 주소값 넣은부분
app.set("views", path.join(__dirname, "view"));

app.engine("html", ejs.renderFile);

app.set("view engine", "html");

router.get('/login', (req, res) => {
    fs.readFile("views/login", "utf-8", (err, page) => {
        console.log(page);
        res.send(page);
    });
});

router.get('/', (req, res) => {
    res.send("ggg");
});

module.exports = router;