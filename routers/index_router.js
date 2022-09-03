const { express } = require("../modules/common");
const indexController = require("../controllers/index_controller");
const SessionMiddleware = require("../middlewares/session_middleware");


const router = express.Router();

router.get("/", SessionMiddleware.pass, indexController.index);

module.exports = router;
