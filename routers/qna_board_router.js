const { express } = require("../modules/common");

const router = express.Router();

const QnaBoardController = require("../controllers/qna_board_controller");

const SessionMiddleware = require("../middlewares/session_middleware");

router.post("/create", SessionMiddleware.validityAdmin, QnaBoardController.create);

router.post("/update", SessionMiddleware.validityAdmin, QnaBoardController.update);

router.get("/create_view", SessionMiddleware.validityAdmin, QnaBoardController.createView);

// 순서대로 경로를 지정해주고 순서에 맞는 키로 저장이 된다.
// 익스프레스 라우터에 get으로 첫번째 파라미터는 경로, 두번째 파라미터는 미들웨어..
router.get("/list/:page/:perPage/",SessionMiddleware.pass, QnaBoardController.listSearching);

router.get("/list/:page/:perPage/:searchKey/:searchWord",SessionMiddleware.pass, QnaBoardController.listSearching);

router.get("/read/:offset",SessionMiddleware.pass, QnaBoardController.view);

router.get("/read/:offset/:searchKey/:searchWord",SessionMiddleware.pass, QnaBoardController.view);

router.get("/update/:id/:offset",SessionMiddleware.validity, QnaBoardController.updateView);

router.get("/delete/:id/", SessionMiddleware.validity,QnaBoardController.delete);


module.exports = router;
