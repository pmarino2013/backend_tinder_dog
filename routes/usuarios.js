const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña debe tener como mínimo 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "No es un correo válido").isEmail(),
    check("rol", "El rol no es válido").isIn(["USER_ROLE", "ADMIN_ROLE"]),
    validarCampos,
  ],
  usuarioPost
);

router.put("/:id", usuarioPut);

router.delete("/:id", usuarioDelete);

module.exports = router;
