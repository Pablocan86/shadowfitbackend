const { Router } = require("express");
const userController = require("../controllers/userController.js");

const router = Router();

router.get("/", userController.traeUsuarios);

router.get("/perfil/:uid", userController.perfilAlumno);

router.get("/perfil/profesor/:pid", userController.perfilProfesor);

// router.post("/", userController.crearUsuario);

// router.post("/login", userController.loguin);

router.put("/:uid", userController.actualizarUsuario);

router.put("/cargarprofesor/:uid/:pid", userController.cargarProfesor);

module.exports = router;
