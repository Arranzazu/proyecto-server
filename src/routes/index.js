const user = require("./user.routes");
const carrito = require("./carrito.routes");
const event = require("./event.routes");
const almacen = require("./almacen.routes");
const venta = require("./venta.routes");
const consumo = require("./consumo.routes");
const category= require("./category.routes");
const prueba= require("./prueba.routes");



module.exports = {
  user,
  carrito,
  almacen,
  event,
  venta,
  consumo,
  category,
  prueba,
};
