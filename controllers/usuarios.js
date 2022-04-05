const { response, request } = require("express");

//importar modelo de usuario
const Usuario = require("../models/usuario");

//Importar bcryptjs
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  //   const query = req.query;
  const { limite = 5, desde = 0 } = req.query;

  // const usuarios = await Usuario.find().skip(desde).limit(limite);
  // const total = await Usuario.countDocuments();

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(),
    Usuario.find().skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuarioPost = async (req = request, res) => {
  const datos = req.body;

  const { nombre, correo, password, rol } = datos;

  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar los datos en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuarioPut = async (req = request, res) => {
  const { id } = req.params;
  const { password, correo, google, ...resto } = req.body;

  //validar password contra la base de datos
  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  //actualizo los datos
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    usuario,
  });
};

const usuarioDelete = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: "DELETE - Info eliminada",
    id,
  });
};

module.exports = {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
