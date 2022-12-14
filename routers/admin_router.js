const { express } = require("../modules/common");
const SessionMiddleware = require("../middlewares/session_middleware");

// 익스프레스 안에있는 요청 url을 전달할 수 있는 라우터 객체를 만듬
// app.use(userRouter); 이런식으로 빼서 사용할 수 있음@!
const router = express.Router();

const AdminController = require("../controllers/admin_controller");

router.get("/user_list/:page/:perPage/:authorityId/:conditionId", SessionMiddleware.validityAdmin, AdminController.listUser);

router.get("/user_list/:page/:perPage/:authorityId/:conditionId/:searchUserId", SessionMiddleware.validityAdmin, AdminController.listUser);

router.post("/approval_user", SessionMiddleware.validityAdmin, AdminController.approvalUser);

router.post("/stop_user", SessionMiddleware.validityAdmin, AdminController.stopUser);

module.exports = router;