const models = require("../models");
// const jwt = require("jsonwebtoken");
const config = require("../config");
// const helpers = require('../helpers');


const create = async (req, res) => {
	try {
       
		const { product, category, unids, active } = req.body;
		if (!product || !category || !unids ) {
			return res.status(409).json({ error: 'Todos los campos son requeridos' });
		}

		const almacen = models.almacen({ product, category, unids, active });
		await almacen.save();

		return res.status(201).json({ almacen });
	} catch (_) {
		return res.status(409).json({ error: 'Hubo un error al crear el producto (Server)' });
	}
};


const all = async (req, res) => {
    try {
        const products = await models.almacen.find();

        return res.json({ products })


    } catch (err) {
        return res.json({ error: 'no se pudo crear el listado' });
    }
};

const get = (req, res) => {
    res.json("get") };

const suprime = (req, res) => {
    res.json("delete") };


module.exports = {
create,
all,
get,
suprime,
};
          