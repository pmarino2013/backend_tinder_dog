const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");

const esRoleValido = async (rol) => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está en la BD`);
  }
};

const emailExiste = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};

const usuarioExiste = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`No existe un usuario con el id ${id}`);
  }
};

const categoriaExiste = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`No existe una categoría con el id ${id}`);
  }
};

//Validar producto por id 🤔

module.exports = {
  esRoleValido,
  emailExiste,
  usuarioExiste,
  categoriaExiste,
};
