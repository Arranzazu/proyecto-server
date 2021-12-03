const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/inventario")
  .then(() => {
    console.log("Base de Datos Mongoose INV conectada");
  })
  .catch((err) => console.log(err));
