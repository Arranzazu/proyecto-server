const { Schema, model } = require("mongoose");

const carritoSchema = new Schema(
  {
    nombrecar: {
        type: String,
        default:"",
        required: true,
        unique:true,
      },
      evento: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    numero: {
        type: Number,
        required: true,
    },
   
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },


//     consumo: [{
//       product: {
//         type: Schema.Types.ObjectId,
//         default:"",
//       },
//      unids:  {
//         type: Number,
//         default:"",
//       },
//       consumo:  {
//         type: Number,
//         default:"",
//       }
//    } ],
},
 
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = model('Carrito', carritoSchema);
