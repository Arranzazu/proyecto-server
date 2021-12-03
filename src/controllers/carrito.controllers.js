const models = require("../models");
// const jwt = require("jsonwebtoken");
const config = require("../config");
// const helpers = require('../helpers');

const create = async (req, res) => {
  try {
    console.log({ body: req.body });
    const { nombrecar, eventId, numero, userId } = req.body;
    if (!nombrecar || !numero) {
      return res.status(409).json({ error: "Todos los campos son requeridos" });
    }

    const evento = await models.event.findById(eventId);
    if (!evento) {
      return res.status(409).json({ error: "Evento no existe" });
    }
	const usuario = await models.user.findById(userId);
    if (!usuario) {
      return res.status(409).json({ error: "El usuario no existe" });
    }
	const eventname = await models.carrito.findOne({ nombrecar });
	if (eventname) {
	  return res.status(400).json({ error: "El nombre ya existe" });
	}

    const carrito = models.carrito({ nombrecar, evento
		, numero, usuario
	 });
    await carrito.save();

    return res.status(201).json({ carrito });
	
  } catch (_) {
    return res 
      .status(409)
      .json({ error: "Hubo un error al crear el carrito (Server)" });
  }
};

const all = async (req, res) => {
  try {
    const carritos = await models.carrito.find();

    return res.json({ carritos });
  } catch (err) {
    return res.json({ error: "no se pudo crear el listado de carritos" });
  }
};
const get = async (req, res) => {
	try {
		const { id } = req.params;

		const carrito = await models.carrito.findById(id).populate('evento')
		return res.json({ carrito});
	} catch (_) {
		return res.status(409).json({ error: 'Carrito no encontrado' });
	}
};

const suprime = (req, res) => {
  res.json("delete");
};

module.exports = {
  create,
  all,
  get,
  suprime,
};
