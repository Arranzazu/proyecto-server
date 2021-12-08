const models = require("../models");

// const jwt = require("jsonwebtoken");
// const config = require("../config");
// const helpers = require('../helpers');
// const moment = require('../moment');

// moment.locale("es");

const create = async (req, res) => {
  try {
    console.log({ body: req.body });
    const { name, date, cars, activo } = req.body;
    if (!name || !date) {
      return res.status(409).json({ error: "Todos los campos son requeridos" });
    }

    const event = models.event({ name, date, cars, activo });
    await event.save();

    return res.status(201).json({ event });
  } catch (_) {
    return res
      .status(409)
      .json({ error: "Hubo un error al crear el evento (Server)" });
  }
};

const all = async (req, res) => {
  try {
    const events = await models.event.find().sort({ date: "asc" });

    return res.json({ events });
  } catch (err) {
    return res.json({ error: "no se pudo crear el listado" });
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await models.event.findById(id);
    return res.json({ event });
  } catch (_) {
    return res.status(409).json({ error: "Evento no encontrado" });
  }
};

const suprime = async (req, res) => {
  try {
    const { id } = req.params;

    await models.event.findByIdAndRemove(id); //TODO: check it.
    // console.log({ res });
    // if (!res) {
    // 	return res.status(409).json(false);
    // }

    return res.json(true);
  } catch (_) {
    return res.status(409).json(false);
  }
};

module.exports = {
  create,
  all,
  get,
  suprime,
};
