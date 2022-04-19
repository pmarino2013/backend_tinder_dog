const cloudinary = require("cloudinary").v2; //para subir imagenes
cloudinary.config(process.env.CLOUDINARY_URL); //configuro cloudinary

const { response } = require("express");
// const { subirArchivo } = require("../helpers");

const { Usuario, Producto } = require("../models");

const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

//Subir imagen a Cloudinary - Nube----------------------------------
const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  //Validar imagenes-----------------------------------
  let files = req.files;
  const { archivo } = files; //obtengo el archivo
  const nombreCortado = archivo.name.split("."); //obtener la extensión separando por el punto
  const extension = nombreCortado[nombreCortado.length - 1]; //la última posición es la extensión
  //validar la extensión
  if (!extensionesValidas.includes(extension)) {
    return res.status(400).json({
      msg: `La extensión ${extension} no es permitida , ${extensionesValidas}`,
    });
  }

  //----------------------------------------------------

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  //Limpiar imagenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");

    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  modelo.img = secure_url;

  await modelo.save();

  res.json(modelo);
};

module.exports = {
  actualizarImagenCloudinary,
};
