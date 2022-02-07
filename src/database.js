const mongoose = require("mongoose");

mongoose
.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gilqp.mongodb.net/inventario?retryWrites=true&w=majority`)
// .connect("mongodb+srv://Edu81:Edu81@cluster0.gilqp.mongodb.net/inventario?retryWrites=true&w=majority")
// .connect("mongodb://localhost/inventario")
  .then(() => {
    console.log("Base de Datos Mongoose INV conectada");
  })
  .catch((err) => console.log(err));
