const { express } = require("../modules/common");

const router = express.Router();

const TipBoardController = require("../controllers/tip_board_controller");

const SessionMiddleware = require("../middlewares/session_middleware");

router.post("/create", SessionMiddleware.validity, TipBoardController.create);

router.post("/update", SessionMiddleware.validity, TipBoardController.update);

router.get("/create_view", SessionMiddleware.validity, TipBoardController.createView);

// 순서대로 경로를 지정해주고 순서에 맞는 키로 저장이 된다.
// 익스프레스 라우터에 get으로 첫번째 파라미터는 경로, 두번째 파라미터는 미들웨어..
router.get("/list/:page/:perPage/", SessionMiddleware.pass, TipBoardController.list);

router.get("/list/:page/:perPage/:searchKey/:searchWord", SessionMiddleware.pass, TipBoardController.listSearch);

router.get("/read/:offset", SessionMiddleware.pass, TipBoardController.view);

router.get("/update/:id/:offset", SessionMiddleware.pass, TipBoardController.updatePrint);

router.get("/delete/:id/", SessionMiddleware.validity, TipBoardController.delete);


module.exports = router;
