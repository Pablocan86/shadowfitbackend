const express = require("express");
const passport = require("passport");
const userController = require("../../controllers/userController.js");
const sessionController = require("../../controllers/sessionController.js");
const {
  isAuthenticated,
  isNotAuthenticated,
} = require("../../midlewars/auth.js");
const router = express.Router();

router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "ok",
    failureRedirect: "fallo",
    failureMessage: true,
  })
);

router.post(
  "/registroprofesores",
  passport.authenticate("registerProfesor", {
    successRedirect: "ok",
    failureRedirect: "fallo",
    failureMessage: true,
  })
);

router.get("/ok", (req, res) => {
  res.send("Registrado");
});

router.get("/fallo", (req, res) => {
  res.send("Fallo");
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "home",
    failureRedirect: "failureLogin",
  })
);

router.post(
  "/loginprofesores",
  passport.authenticate("loginProfesor", {
    successRedirect: "home",
    failureRedirect: "failureLogin",
  })
);

router.get("/home", userController.login);

router.get("/failureLogin", (req, res) => {
  res.render("login", { error: "Valores incorrectos" });
});

router.post("/logout", sessionController.logout);

module.exports = router;
