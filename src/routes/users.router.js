const { Router } = require("express");
const userController = require("../controllers/userController.js");
const { isAuthenticated, isNotAuthenticated } = require("../midlewars/auth.js");
const router = Router();

router.get("/", userController.traeUsuarios);

router.get("/perfil/:uid", isAuthenticated, userController.perfilAlumno);

router.get(
  "/perfil/profesor/:pid",
  isAuthenticated,
  userController.perfilProfesor
);

router.get("/panelalumno/:uid", isAuthenticated, userController.panelAlumnos);

// router.post("/", userController.crearUsuario);

// router.post("/login", userController.loguin);

router.put("/:uid", userController.actualizarUsuario);

router.put("/cargarprofesor/:uid/:pid", userController.cargarProfesor);

router.put("/cargarrutina/:uid", userController.cargarRutina);

module.exports = router;
