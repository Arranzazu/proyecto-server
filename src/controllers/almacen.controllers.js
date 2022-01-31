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

		const asignado = await models.asignado.findById(id)
		return res.json({ asignado });
	} catch (_) {
		return res.status(409).json({ error: 'Asignacion no encontrada' });
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
    try {
        const products = await models.almacen.find().sort({ category: 'asc' });
		const asignados = await models.asignado.find()
		const venta = []
		const eventos = await models.event.find()
		const carritos = await models.carrito.find()
		for (const evento of eventos) {
			const infoevento = {
				id: evento._id,
				nombre: evento.name,
				productos: []
				
			}
			for (const asignado of asignados) {
				for (const producto of products) {
					for (const carrito of carritos){
						
						if (asignado.producto._id.toString() === producto._id.toString() && asignado.carrito._id.toString() === carrito._id.toString() && carrito.evento._id.toString() === evento._id.toString()) {
							infoevento.productos.push({
								name: producto.product,
								id: producto.id,
								asignado: asignado.unidades,
								
								
								venta: asignado.venta,
							})

						}
					}
				}
			} 

			venta.push(infoevento)		
		}
	
        return res.json({ venta })


    } catch (err) {
        return res.json({ error: 'no se pudo crear el listado' });
    }
};


// const all = async (req, res) => {
//     try {
//         const products = await models.almacen.find().sort({ category: 'asc' });
// 		const products2 = JSON.parse(JSON.stringify(products))
// 		const eventos = await models.event.find()
// 		for (const product of products2) {
// 			product.events = [{}]
// 			for (const venta of ventas)	{
// 				if (venta.producto===product) {

// 				}
// 			}
// 		}
		

//         return res.json({ products2 })


//     } catch (err) {
//         return res.json({ error: 'no se pudo crear el listado' });
//     }
// };



const suprime = (req, res) => {
    res.json("delete") };


module.exports = {
create,
all,
all2,
get,
suprime,
all2,
};
          