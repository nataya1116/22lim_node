const { express } = require("../modules/common");

const router = express.Router();

const SkinProdutsController = require("../controllers/game_skin_products_controller");
const SessionMiddleware = require("../middlewares/session_middleware");


router.get("/list", SessionMiddleware.pass, SkinProdutsController.list);

module.exports = router;