const { model, Schema } = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      tolowercase: true,
      trim: true,
      },
    date: {
      type: Date,
      required: true,
    },
    cars: {
      type: String,
      required: true,
      
      },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Event", eventSchema);