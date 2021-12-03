const { Router } = require("express");
const controllers = require("../controllers");
// const middleware = require("../middleware");

const router = Router();


router.post("/create", controllers.carrito.create);
router.get("/all", controllers.carrito.all);
router.get("/get/:id", controllers.carrito.get);
router.delete("/suprime/:id", controllers.carrito.suprime);

module.exports = router;
