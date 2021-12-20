const models = require("../models");
const config = require("../config");

const create = async (req, res) => {
  try {
    console.log({ body: req.body });
    const { carritoId, unidades, productoId } = req.body;
    console.log({ carritoId, unidades, productoId } )
    // if (!productoId || !unidades) {
    //   return res.status(409).json({ error: "Todos los campos son requeridos" });
    // }

    const carrito = await models.carrito.findById(carritoId);
    // if (!carrito) {
    //   return res
    //     .status(409)
    //     .json({ error: "El carrito seleccionado no existe" });
    // }
    const producto = await models.almacen.findById(productoId);
    // if (!producto) {
    //   return res.status(409).json({ error: "El producto no existe" });
    // }
    // prueba unidades almacen
    // var unids = await models.almacen.findById(productoId);
    // if (!unids) {
    //   return res.status(409).json({ error: "El producto no existe" });
    // }
    //Fin prueba


    const consumo = models.consumo({
      carrito,
      producto,
      unidades,
    });  
    
    await consumo.save();


    return res.status(201).json({ consumo });
  } catch (_) {
    return res
      .status(409)
      .json({ error: "Hubo un error al crear el consumo (Server)" });
  }
};

const all = async (req, res) => {
  try {
    const consumos = await models.consumo.find().populate('producto');
    return res.json({ consumos });
  } catch (err) {
    return res.json({ error: "no se pudo crear el listado de consumos" });
  }
};

module.exports = {
  create,
  all,
};
