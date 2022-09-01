const { express } = require("../modules/common");

// 익스프레스 안에있는 요청 url을 전달할 수 있는 라우터 객체를 만듬
// app.use(userRouter); 이런식으로 빼서 사용할 수 있음@!
const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/login2", (req, res) => {
  res.render("login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// 회원가입창
router.get("/signup", (req, res) => {
  // console.log(req);
  res.render("signup");
});

// 이메일 인증번호 보내는 곳
router.post("/emailCheck", (req, res) => {
  userController.emailSend(req, res);
});

// 임시로 마이페이지 수정을 열었음 나중에 post방식으로 바꿀 것
router.get("/mypage_edit", (req, res) => {
  userController.userMyPageEdit(req, res);
});

// 임시로 만든 라우터! 헤더랑 푸터 붙임
router.get("/shop", (req, res) => {
  res.render("shop");
});

// 임시로 만든 라우터! 헤더랑 푸터 붙임
router.get("/skin_list", (req, res) => {
  res.render("skin_list");
});

// router.post("/login", userController.loginTmp);
router.post("/login", userController.login);

module.exports = router;
