const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
  
    categoryname: {
        type: String,
        required: true,
      },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);