const { Router } = require("express");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarArchivo } = require("../middlewares/validar-archivos");

const { actualizarImagenCloudinary } = require("../controllers/uploads");

const { coleccionesPermitidas } = require("../helpers/db-validators");

const router = Router();

router.put(
  "/:coleccion/:id",
  [
    validarArchivo,
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagenCloudinary
  // actualizarImagen
);

module.exports = router;
