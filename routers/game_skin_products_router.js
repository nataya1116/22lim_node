const { express } = require("../modules/common");

const router = express.Router();

const SkinProdutsController = require("../controllers/game_skin_products_controller");
const SessionMiddleware = require("../middlewares/session_middleware");


router.get("/list/:page/:perPage", SessionMiddleware.pass, SkinProdutsController.list);

router.get("/list_wish/:page/:perPage", SessionMiddleware.validity, SkinProdutsController.listWish);

router.get("/list_own/:page/:perPage", SessionMiddleware.validity, SkinProdutsController.listOwn);

module.exports = router;