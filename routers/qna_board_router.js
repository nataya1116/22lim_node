const { express } = require("../modules/common");

const router = express.Router();

const QnaBoardController = require("../controllers/qna_board_controller");

const SessionMiddleware = require("../middlewares/session_middleware");

router.post("/create", SessionMiddleware.validity, QnaBoardController.create);

router.post("/update", SessionMiddleware.validity, QnaBoardController.update);

router.get("/create_view", SessionMiddleware.validity, QnaBoardController.createView);

// 순서대로 경로를 지정해주고 순서에 맞는 키로 저장이 된다.
// 익스프레스 라우터에 get으로 첫번째 파라미터는 경로, 두번째 파라미터는 미들웨어..
router.get("/list/:page/:perPage/",SessionMiddleware.pass, QnaBoardController.list);
router.get(
  "/list/:page/:perPage/:searchKey/:searchWord",SessionMiddleware.pass,
  QnaBoardController.listSearch
);

router.get("/read/:offset",SessionMiddleware.pass, QnaBoardController.view);

router.get("/update/:id/:offset",SessionMiddleware.pass, QnaBoardController.updatePrint);

router.get("/delete/:id/", SessionMiddleware.validity,QnaBoardController.delete);

// router.get("/test/:tq", (req, res) => {
//     console.log("router test호출하는 부분");
//     TipBoardController.test(req, res);
// });

module.exports = router;
