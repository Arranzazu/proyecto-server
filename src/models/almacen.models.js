const { model, Schema } = require("mongoose");

const almacenSchema = new Schema(
  {
    product: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
      },
    unids: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Almacen", almacenSchema);