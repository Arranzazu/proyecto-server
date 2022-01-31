const user = require("./user.controllers");
const event = require("./event.controllers");
const carrito = require("./carrito.controllers");
const almacen = require("./almacen.controllers");
const asignado = require("./asignado.controllers");
const consumo = require("./consumo.controllers");
const category = require("./category.controllers");

module.exports = {
user,
event,
carrito, 
almacen,
asignado,
consumo,
category,
};
