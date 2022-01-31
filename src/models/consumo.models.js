const { Schema, model } = require("mongoose");

const consumoSchema = new Schema(
  {
    carrito: {
      type: Schema.Types.ObjectId,
      ref: "Carrito",
    },
    producto: {
      type: Schema.Types.ObjectId,
      ref: "Almacen",
    },

    // asignado: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Asignado",
    //   },

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
module.exports = model("Consumo", consumoSchema);
