const { Router } = require("express");

const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { tieneRole } = require("../middlewares/validar-roles");
const { productoExiste } = require("../helpers/db-validators");
//productoExiste

const {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  borrarProducto,
  obtenerProducto,
} = require("../controllers/producto");

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(productoExiste), //me aseguro si existe un producto con ese ID 🤔
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearProducto
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(productoExiste), //me aseguro si existe un producto con ese ID 🤔

    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(productoExiste), //me aseguro si existe un producto con ese ID 🤔
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
