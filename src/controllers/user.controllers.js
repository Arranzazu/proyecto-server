const models = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");
const helpers = require('../helpers');


const signUp = async (req, res) => {
  console.log('Hola llegaste a SignUP')
	try {
		const { email, password1, password2 } = req.body;
;
		if (!email || !password1 || !password2 || password1 !== password2) {
			return res.status(409).json({ error: 'Email or password incorrectos!' });
		}
		const hash = await helpers.bcrypt.encrypt(password1);
		const user = models.user({ email, password: hash }); //password que se codifica
   		await user.save();
		return res.status(201).json({ user });
	} catch (err) {
		return res.status(409).json({ error: 'Hubo un error en tu preceso de crear el usuario' });
	}
};


const login = async (req, res) => {
  console.log('login')
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(409).json({ error: 'Email or password incorrectos!!' });
		}

		const user = await models.user.findOne({ email });
		if (!user) {
			return res.status(409).json({ error: 'El usuario no existe!' });
		}

		const isValid = await helpers.bcrypt.compare(password, user.password);
		if (!isValid) {
			return res.status(409).json({ error: 'Password invalido!' });
		}
		// Asigno el Token
		const token = jwt.sign({ user }, config.jwt.secret);
	
//Envío los parámetros
    return res.json({ email, token, admin: user.admin, userId: user._id });
      } catch (err) {
        return res.json({ err });
	}
};

const create = async (req, res) => {
  try {
     const user = await models.user.create(req.body);
    return res.json({ user });
  } catch (err) {
    return res.json({ err });
  }
};


const all = async (req, res) => {
	try {
	 
	  const users = await models.user.find(); // listará todos los usuarios
	  return res.json({ users });
	} catch (err) {
        return res.json({ error: 'no se pudo crear el listado' });
    }
  };

// const all = async (req, res) => {
//   try {
//     const data = jwt.verify(req.headers.token, config.jwt.secret);
//     const users = await models.user.find({ _id: { $ne: data.user._id } }); // listará todos los usuarios menos el mio

//     return res.json({ users });
//   } catch (err) {
//     return res.json({ err });
//   }
// };


const suprime = async (req, res) => {
	const { id } = req.params;
	const user = await models.user.findOneAndRemove({ _id: id });
	res.json({ user });
	return res.json("usuario borrado"); 
};

const AdminYes = async (req, res) => {
	console.log('change State')
    try {
      const { id } = req.params;

      const user = await models.user.findById({ _id: id });
      if (!user) {
        throw "The user does not exist";
      }

      user.admin = true;
      await user.save();
      return res.status(200).json({ user });
    } catch (e) {
      return res.status(400).json({ e });
    }

  };

  const AdminNo = async (req, res) => {
	console.log('change State')
    try {
      const { id } = req.params;

      const user = await models.user.findById({ _id: id });
      if (!user) {
        throw "The user does not exist";
      }

      user.admin = false;
      await user.save();
      return res.status(200).json({ user });
    } catch (e) {
      return res.status(400).json({ e });
    }

  };



module.exports = {
  create,
  signUp,
  all,
  login,
  suprime, 
  AdminYes,
  AdminNo,
  };
