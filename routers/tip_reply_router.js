const { express } = require("../modules/common");

const router = express.Router();

const TipReplyController = require("../controllers/tip_reply_controller");

const SessionMiddleware = require("../middlewares/session_middleware");

router.post("/create", SessionMiddleware.validity, TipReplyController.create);

router.post("/create_nested", SessionMiddleware.validity,TipReplyController.createNested);

router.post("/update", SessionMiddleware.validity, TipReplyController.update);

router.get("/delete/:id/:offset", SessionMiddleware.validity, TipReplyController.delete)



module.exports = router;
