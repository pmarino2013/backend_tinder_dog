const { Router } = require("express");

const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { categoriaExiste } = require("../helpers/db-validators");
const { tieneRole } = require("../middlewares/validar-roles");
const {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categoria");

const router = Router();

router.get("/", obtenerCategorias);

router.get(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  obtenerCategoria
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

router.put(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTA_ROLE"),
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(categoriaExiste),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTA_ROLE"),
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
