const models = require("../models");
const config = require("../config");

const create = async (req, res) => {
  try {
    console.log({ body: req.body });
    const { carritoId, unidades, productoId } = req.body;
    if (!productoId || !unidades) {
      return res.status(409).json({ error: "Todos los campos son requeridos" });
    }

    const carrito = await models.carrito.findById(carritoId);
    if (!carrito) {
      return res
        .status(409)
        .json({ error: "El carrito seleccionado no existe" });
    }
    const producto = await models.almacen.findById(productoId);
    if (!producto) {
      return res.status(409).json({ error: "El producto no existe" });
    }
    // prueba unidades almacen
    // var unids = await models.almacen.findById(productoId);
    // if (!unids) {
    //   return res.status(409).json({ error: "El producto no existe" });
    // }
    //Fin prueba


    const venta = models.venta({
      carrito,
      producto,
      unidades,
    });  
  
    // const almacen = models.almacen({
    // unids,
    // });
    producto.unids =+ unidades;
    await venta.save();
    // await almacen.save(); 

    return res.status(201).json({ venta });
  } catch (_) {
    return res
      .status(409)
      .json({ error: "Hubo un error al crear la venta (Server)" });
  }
};

const all = async (req, res) => {
  try {
    const ventas = await models.venta.find().populate('producto');
    return res.json({ ventas });
  } catch (err) {
    return res.json({ error: "no se pudo crear el listado de ventas" });
  }
};

module.exports = {
  create,
  all,
};
