const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

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
const productoExiste = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`No existe un producto con el id ${id}`);
  }
};

//Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(
      `La colección ${coleccion} no es permitida, las colecciones permitidas son: ${colecciones}`
    );
  }

  return true;
};

module.exports = {
  esRoleValido,
  emailExiste,
  usuarioExiste,
  categoriaExiste,
  productoExiste,
  coleccionesPermitidas,
};
