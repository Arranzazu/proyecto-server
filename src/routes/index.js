const user = require("./user.routes");
const carrito = require("./carrito.routes");
const event = require("./event.routes");
const almacen = require("./almacen.routes");
const venta = require("./venta.routes");


module.exports = {
  user,
  carrito,
  almacen,
  event,
  venta,
};
