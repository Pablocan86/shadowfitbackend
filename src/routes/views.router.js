const { Router } = require("express");

const router = Router();

router.get("/chat", (req, res) => {
  res.render("chat", { title: "chat" });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/loginprofesores", (req, res) => {
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
