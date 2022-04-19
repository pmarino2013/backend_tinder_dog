const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files; //obtengo el archivo

    const nombreCortado = archivo.name.split("."); //obtener la extensión separando por el punto

    const extension = nombreCortado[nombreCortado.length - 1]; //la última posición es la extensión

    //validar la extensión
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extensión ${extension} no es permitida , ${extensionesValidas}`
      );
    }

    const nombreTemp = uuidv4() + "." + extension; //cambio el nombre al archivo
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp); //genero direccion de ubicación

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
