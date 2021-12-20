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

const get = async (req, res) => {
	try {
		const { id } = req.params;

		const venta = await models.venta.findById(id)
		return res.json({ venta });
	} catch (_) {
		return res.status(409).json({ error: 'Venta no encontrada' });
	}
};

const all = async (req, res) => {
    try {
        const products = await models.almacen.find().sort({ category: 'asc' });

        return res.json({ products })


    } catch (err) {
        return res.json({ error: 'no se pudo crear el listado' });
    }
};


const all2 = async (req, res) => {
    // try {
    //     const products = await models.almacen.find().sort({ category: 'asc' });
	// 	const products2 = JSON.parse(JSON.stringify(products))
	// 	const eventos = await models.event.find()
	// 	for (const product of products2) {
	// 		product.events = [{}]
	// 		for (const venta of ventas)	{
	// 			if (venta.producto===product) {

	// 			}
	// 		}
	// 	}
		

    //     return res.json({ products2 })


    // } catch (err) {
    //     return res.json({ error: 'no se pudo crear el listado' });
    // }
};



const suprime = (req, res) => {
    res.json("delete") };


module.exports = {
create,
all,
get,
suprime,
all2,
};
          