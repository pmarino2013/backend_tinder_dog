const { response, request } = require("express");

// const { validationResult } = require("express-validator");

//importar modelo de usuario
const Usuario = require("../models/usuario");

//Importar bcryptjs
const bcryptjs = require("bcryptjs");

const usuariosGet = (req = request, res = response) => {
  //   const query = req.query;
  const { nombre = "No name", apikey, limit = 5, page = 1 } = req.query;

  res.json({
    msg: "Bienvenidos al módulo 4",
    nombre,
    apikey,
    limit,
    page,
  });
};

const usuarioPost = async (req = request, res) => {
  //recibir la respuesta del check
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors);
  // }

  const datos = req.body;

  const { nombre, correo, password, rol } = datos;

  const usuario = new Usuario({ nombre, correo, password, rol });

  //verificar el correo
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya existe",
    });
  }

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar los datos en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuarioPut = (req = request, res) => {
  const id = req.params.id;

  res.json({
    msg: "PUT - Info actualizada",
    id,
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
