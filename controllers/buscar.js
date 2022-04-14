const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const coleccionesPermitidas = ["usuarios", "categorias", "productos"];

//Buscar coleccion Usuarios
const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  //por nombre o correo
  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

//Buscar por categoria
const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  //por nombre
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex, estado: true });

  res.json({
    results: categorias,
  });
};

//Buscar por productos
const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const producto = await Producto.findById(termino);
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  //por nombre
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};

const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Se le olvidó hacer esta búsqueda",
      });
      break;
  }
};

module.exports = {
  buscar,
};
