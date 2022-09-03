const { express } = require("../modules/common");

const router = express.Router();

const SkinWishController = require("../controllers/game_skin_wish_controller");
const SessionMiddleware = require("../middlewares/session_middleware");

router.post("/create", SessionMiddleware.validity, SkinWishController.create);

router.post("/delete", SessionMiddleware.validity, SkinWishController.delete)

module.exports = router;