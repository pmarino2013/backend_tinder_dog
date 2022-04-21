const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { tieneRole } = require("../middlewares/validar-roles");

const {
  esRoleValido,
  emailExiste,
  usuarioExiste,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioGetId,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
  ],
  usuarioGetId
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña debe tener como mínimo 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "No es un correo válido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuarioPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExiste),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuarioPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTA_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
  ],
  usuarioDelete
);

module.exports = router;
