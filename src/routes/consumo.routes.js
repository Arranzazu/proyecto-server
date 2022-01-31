const { Router } = require("express");
const controllers = require("../controllers");
// const middleware = require("../middleware");

const router = Router();


router.post("/create", controllers.consumo.create);
router.get("/all", controllers.consumo.all);
router.get("/get/:id", controllers.consumo.get);
// router.delete("/suprime/:id", controllers.consumo.suprime);
router.put('/:id', controllers.consumo.update);

module.exports = router;
