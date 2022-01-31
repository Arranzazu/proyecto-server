const models = require("../models");
const config = require("../config");

const create = async (req, res) => {
  try {
    console.log({ body: req.body });
    const { carritoId, unidades, productoId, venta} = req.body;
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


    const asignado = models.asignado({
      carrito,
      producto,
      unidades,
      venta,
  
    });  
  
    // const almacen = models.almacen({
    // unids,
    // });
    producto.unids =+ unidades;
    await asignado.save();
    // await almacen.save(); 

    return res.status(201).json({ asignado });
  } catch (_) {
    return res
      .status(409)
      .json({ error: "Hubo un error al crear la asignacion (Server)" });
  }
};



const all = async (req, res) => {
  try {
    const asignados = await models.asignado.find().populate('producto');
    return res.json({ asignados });
  } catch (err) {
    return res.json({ error: "no se pudo crear el listado de asgnados" });
  }
};

module.exports = {
  create,
  all,
};
