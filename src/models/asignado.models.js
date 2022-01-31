const { Schema, model } = require("mongoose");

const asignadoSchema = new Schema(
  {
    carrito: {
      type: Schema.Types.ObjectId,
      ref: "Carrito",
    },
    producto: {
      type: Schema.Types.ObjectId,
      ref: "Almacen",
    },

    // evento: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Carrito",
    // },

    unidades: {
      type: Number,
      required: true,
    },

    venta: {
      type: Number,
      required: true,
      default: 0,
    },

  },

  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = model("Asignado", asignadoSchema);
