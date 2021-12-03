const { Router } = require("express");
const controllers = require("../controllers");
// const middleware = require("../middleware");

const router = Router();


router.post("/create", controllers.event.create);
router.get("/all", controllers.event.all);
router.get("/get/:id", controllers.event.get);
router.delete("/suprime/:id", controllers.event.suprime);

module.exports = router;
