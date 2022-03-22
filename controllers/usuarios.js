const { response, request } = require("express");

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

const usuarioPost = (req = request, res) => {
  const datos = req.body;

  res.json({
    msg: "POST - Info creada",
    datos,
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
