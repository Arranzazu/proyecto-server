const models = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");
const helpers = require('../helpers');

const create = async (req, res) => {
  try {
    const { product, category} = req.body;
    if (!product || !category) {
      return res.status(409).json({ error: "Todos los campos son requeridos" });
    }

    const almacen = models.almacen({ product, category});
    await almacen.save();

    return res.status(201).json({ almacen });
  } catch (_) {
    return res
      .status(409)
      .json({ error: "Hubo un error al crear el producto (Server)" });
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;

    const asignado = await models.asignado.findById(id);
    return res.json({ asignado });
  } catch (_) {
    return res.status(409).json({ error: "Asignacion no encontrada" });
  }
};
const all = async (req, res) => {
  try {
    const products = await models.almacen.find().sort({ category: "asc" });

    return res.json({ products });
  } catch (err) {
    return res.json({ error: "no se pudo crear el listado" });
  }
};

const all2 = async (req, res) => {
  try {
    const products = await models.almacen.find().sort({ category: "asc" });
    const asignados = await models.asignado.find();
    const venta = [];
    const eventos = await models.event.find().sort({ date: "asc" });;
    const carritos = await models.carrito.find();
    for (const evento of eventos) {
      const infoevento = {
        id: evento._id,
        nombre: evento.name,
        productos: [],
      };
      for (const asignado of asignados) {
        for (const producto of products) {
          for (const carrito of carritos) {
            if (
              asignado.producto._id.toString() === producto._id.toString() &&
              asignado.carrito._id.toString() === carrito._id.toString() &&
              carrito.evento._id.toString() === evento._id.toString()
            ) {
              infoevento.productos.push({
                name: producto.product,
                id: producto.id,
                asignado: asignado.unidades,

                venta: asignado.venta,
              });
            }
          }
        }
      }

      venta.push(infoevento);
    }

    return res.json({ venta });
  } catch (err) {
    return res.json({ error: "no se pudo crear el listado" });
  }
};

const suprime = async (req, res) => {
  try {
    const { id } = req.params;

    await models.almacen.findByIdAndRemove(id);

    return res.json("Eliminado");
  } catch (_) {
    return res.status(409).json("no se ha podido Eliminar");
  }
};

const ActiveYes = async (req, res) => {
	console.log('cambio de no activo/activo')
    try {
      const { id } = req.params;

      const product = await models.almacen.findById({ _id: id });
      if (!product) {
        throw "El producto no existe";
      }

      product.active = true;
      await product.save();
      return res.status(200).json({ product });
    } catch (e) {
      return res.status(400).json({ e });
    }

  };

  const ActiveNo = async (req, res) => {
	console.log('cambio de activo/no activo')
    try {
      const { id } = req.params;

      const product = await models.almacen.findById({ _id: id });
      if (!product) {
        throw "The user does not exist";
      }

      product.active = false;
      await product.save();
      return res.status(200).json({ product });
    } catch (e) {
      return res.status(400).json( { e });
    }

  };

module.exports = {
  create,
  all,
  all2,
  get,
  suprime,
  all2,
  ActiveYes,
  ActiveNo,
};
