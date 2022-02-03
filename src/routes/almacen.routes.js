const { Router } = require("express");
const controllers = require("../controllers");
const middleware = require("../middleware");

const router = Router();


router.post("/create", controllers.almacen.create);
router.get("/all", controllers.almacen.all);
router.get("/all2", controllers.almacen.all2);
router.get("/get/:id", controllers.almacen.all);
router.delete("/suprime/:id", controllers.almacen.suprime);
router.post("/ActiveYes/:id", controllers.almacen.ActiveYes);
router.post("/ActiveNo/:id", controllers.almacen.ActiveNo);


module.exports = router;
