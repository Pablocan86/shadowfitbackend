const { Router } = require("express");
const viewsController = require("../controllers/views.Controller.js");
const {
  isAuthenticated,
  isNotAuthenticated,
  isNotAuthenticatedProfesor,
} = require("../midlewars/auth.js");
const router = Router();

router.get("/chat", (req, res) => {
  res.render("chat", { title: "chat" });
});

router.get("/paginaprincipal", viewsController.home);

router.get("/login", isNotAuthenticated, (req, res) => {
  res.render("login");
});

router.get(
  "/confeccionrutinas",
  isAuthenticated,
  viewsController.confeccionRutinas
);

router.get("/loginprofesores", isNotAuthenticatedProfesor, (req, res) => {
  res.render("loginProfesores");
});

router.get("/registro", (req, res) => {
  res.render("register");
});

router.get("/registroprofesores", (req, res) => {
  res.render("registroProfesores");
});

router.get("/", (req, res) => {
  res.send({ message: "Pantalla inicio" });
});

module.exports = router;
