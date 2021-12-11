const { Router } = require("express");
const controllers = require("../controllers");
// const middleware = require("../middleware");

const router = Router();


router.post("/create", controllers.category.create);
router.get("/all", controllers.category.all);
router.get("/get/:id", controllers.category.get);
router.delete("/suprime/:id", controllers.category.suprime);
// router.put('/:id', controllers.category.update);

module.exports = router;
