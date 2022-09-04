const { express } = require("../modules/common");
const SessionMiddleware = require("../middlewares/session_middleware");

// 익스프레스 안에있는 요청 url을 전달할 수 있는 라우터 객체를 만듬
// app.use(userRouter); 이런식으로 빼서 사용할 수 있음@!
const router = express.Router();

const UserController = require("../controllers/user_controller");

router.get("/login", UserController.loginView);

// 회원가입창
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", UserController.signUp);

router.post("/id_overlap", UserController.useIdOverlap);

// 이메일 인증번호 보내는 곳
router.post("/email_check", (req, res) => {
  UserController.emailSend(req, res);
});

// 이메일 인증번호 확인
router.post("/email_num_check", UserController.emailNumCheck);

// 임시로 마이페이지 수정을 열었음 나중에 post방식으로 바꿀 것
router.get("/mypage", SessionMiddleware.validity, (req, res) => {
  UserController.userMyPage(req, res);
});

// 마이페이지에서 비밀번호 변경
router.get("/update_pw", (req, res) => {
  res.render("update_pw");
});

router.post("/update_pw", SessionMiddleware.validity, (req, res) => {
  UserController.myPageUpdatePw(req, res);
});

// 임시로 만든 라우터! 헤더랑 푸터 붙임
router.get("/shop", (req, res) => {
  res.render("shop");
});

// 임시로 만든 라우터! 헤더랑 푸터 붙임
router.get("/skin_list", (req, res) => {
  res.render("skin_list");
});

// router.post("/login", UserController.loginTmp);
router.post("/login", UserController.login);

module.exports = router;
