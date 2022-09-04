const { express } = require("../modules/common");

const router = express.Router();

const QnaReplyController = require("../controllers/qna_reply_controller");

const SessionMiddleware = require("../middlewares/session_middleware");

router.post("/create",SessionMiddleware.validity, QnaReplyController.create);

router.post("/create_nested", SessionMiddleware.validity,QnaReplyController.createNested);

router.post("/update",SessionMiddleware.validity, QnaReplyController.update);

router.get("/delete/:id/:offset",SessionMiddleware.validity, QnaReplyController.delete);

module.exports = router;
