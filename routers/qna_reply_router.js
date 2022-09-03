const { express } = require("../modules/common");

const router = express.Router();

const QnaReplyController = require("../controllers/qna_reply_controller");

router.post("/create", QnaReplyController.create);

router.post("/create_nested", QnaReplyController.createNested);

router.post("/update", QnaReplyController.update);

// router.get("/update/:id/:offset", QnaReplyController.updatePrint);

router.get("/delete/:id/:offset", QnaReplyController.delete);

module.exports = router;
