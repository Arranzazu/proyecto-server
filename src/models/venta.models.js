const { Schema, model } = require("mongoose");

const ventaSchema = new Schema(
  {
    carrito: {
      type: Schema.Types.ObjectId,
      ref: "Carrito",
    },
    producto: {
      type: Schema.Types.ObjectId,
      ref: "Almacen",
    },

    unidades: {
      type: Number,
      required: true,
    },

  },

  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = model("Venta", ventaSchema);
