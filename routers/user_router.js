const { express } = require("../modules/common");
const SessionMiddleware = require("../middlewares/session_middleware");

// 익스프레스 안에있는 요청 url을 전달할 수 있는 라우터 객체를 만듬
// app.use(userRouter); 이런식으로 빼서 사용할 수 있음@!
const router = express.Router();

const UserController = require("../controllers/user_controller");
const PointHistoryController = require("../controllers/point_history_controller");
const findIdController = require("../controllers/find_id_controller");

router.get("/login", UserController.loginView);

router.post("/login", UserController.login);

router.get("/logout", SessionMiddleware.pass, UserController.logout);

// 회원가입창
router.get("/signup", UserController.signUpView);

router.post("/signup", UserController.signUp);

router.post("/id_overlap", UserController.useIdOverlap);

// 이메일 인증번호 보내는 곳
router.post("/email_check", UserController.emailSend);

// 이메일 인증번호 확인
router.post("/email_num_check", UserController.emailNumCheck);

// 임시로 마이페이지 수정을 열었음 나중에 post방식으로 바꿀 것
router.get("/mypage", SessionMiddleware.validity, UserController.userMyPage);

// 마이페이지에서 비밀번호 변경
router.get("/update_pw", SessionMiddleware.validity, UserController.myPageUpdatePwView);

// 로그인 창에서 아이디 찾기
router.get("/find_id", findIdController.findIdView);

router.post("/find_id", findIdController.idEmailSend);

router.post("/update_pw", SessionMiddleware.validity, UserController.myPageUpdatePw);

router.get("/point_history/:page/:perPage/", SessionMiddleware.validity, PointHistoryController.list);

router.get("/point_history/:page/:perPage/:isPayment", SessionMiddleware.validity, PointHistoryController.listIsPayment);

module.exports = router;
