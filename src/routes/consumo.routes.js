const { Router } = require("express");
const controllers = require("../controllers");
// const middleware = require("../middleware");

const router = Router();


router.post("/create", controllers.consumo.create);
router.get("/all", controllers.consumo.all);
// router.get("/get/:id", controllers.venta.get);
// router.delete("/suprime/:id", controllers.venta.suprime);
// router.put('/:id', controllers.venta.update);

module.exports = router;
