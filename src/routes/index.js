const user = require("./user.routes");
const carrito = require("./carrito.routes");
const event = require("./event.routes");
const almacen = require("./almacen.routes");
const asignado = require("./asignado.routes");
const consumo = require("./consumo.routes");
const category= require("./category.routes");
const prueba= require("./prueba.routes");



module.exports = {
  user,
  carrito,
  almacen,
  event,
  asignado,
  consumo,
  category,
  prueba,
};
