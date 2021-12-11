const models = require("../models");
// const jwt = require("jsonwebtoken");
const config = require("../config");
// const helpers = require('../helpers');


const create = async (req, res) => {
	try {
       
		const { categoryname } = req.body;
		if (!categoryname ) {
			return res.status(409).json({ error: 'Es necesario indicar el nombre de la categoría' });
		}

		const category = models.category({ categoryname });
		await category.save();

		return res.status(201).json({ category });
	} catch (_) {
		return res.status(409).json({ error: 'Hubo un error al crear la categoría(Server)' });
	}
};
const all = async (req, res) => {
    try {
      const categorys = await models.category.find().populate('categoryname').sort({ categoryname: 'asc' });;
  
      return res.json({ categorys });
    } catch (err) {
      return res.json({ error: "no se pudo crear el listado de categorias" });
    }
  };
  const get = async (req, res) => {
      try {
          const { id } = req.params;
  
          const category = await models.category.findById(id).populate('categoryname')
          return res.json({ category });
      } catch (_) {
          return res.status(409).json({ error: 'Category no encontrado' });
      }
  };
  
  const suprime = async (req, res) => {
    const { id } = req.params;
	const category = await models.category.findOneAndRemove({ _id: id });
	res.json({ category });
	return res.json("Categoría Eliminada"); 
};

  

module.exports = {
create,
all,
get,
suprime,
};
          