const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");


const server = express();

// Settings.
server.set("PORT", 4500);

// Middlewares.
server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

//Routes.
server.use("/user", routes.user);
server.use("/event", routes.event);
server.use("/almacen", routes.almacen);
server.use("/carrito", routes.carrito);
server.use("/asignado", routes.asignado);
server.use("/consumo", routes.consumo);
server.use("/category", routes.category);
server.use("/prueba", routes.prueba);

// Static folder.

module.exports = server;
