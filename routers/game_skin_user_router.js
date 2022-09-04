const { express } = require("../modules/common");

const router = express.Router();

const SkinUserController = require("../controllers/game_skin_user_controller");
const SessionMiddleware = require("../middlewares/session_middleware");

router.post("/buy", SessionMiddleware.validity, SkinUserController.create);

router.post("/use", SessionMiddleware.validity, SkinUserController.use)

module.exports = router;