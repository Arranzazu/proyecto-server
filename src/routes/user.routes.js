const { Router } = require("express");
const controllers = require("../controllers");
const middleware = require("../middleware");

const router = Router();

router.post("/signUp", controllers.user.signUp);
router.post("/login", controllers.user.login);


router.post("/create", middleware.users.isValid, controllers.user.create);
// router.post("/create", controllers.user.create);
router.get("/all", controllers.user.all);
// router.get("/all", controllers.user.all);
router.post("/login", controllers.user.login);
router.post("/AdminYes/:id", controllers.user.AdminYes);
router.post("/AdminNo/:id", controllers.user.AdminNo);
router.delete("/suprime/:id", controllers.user.suprime);

module.exports = router;
