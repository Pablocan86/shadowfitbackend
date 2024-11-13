const UserManager = require("../dao/classes/users.dao.js");

const userService = new UserManager();

exports.home = async (req, res) => {
  if (!req.session.user) {
    return res.render("home", { style: "home.css", title: "Página principal" });
  }
  if (req.session.user.rol === "alumno") {
    let alumno = req.session.user;
    return res.render("home", {
      alumno: alumno,
      session: req.session.user,
      style: "home.css",
      title: "Página principal",
    });
  }
  if (req.session.user.rol === "profesor") {
    let profesor = req.session.user;
    return res.render("home", {
      profesor: profesor,
      session: req.session.user,
      style: "home.css",
      title: "Página principal",
    });
  }
};

exports.confeccionRutinas = async (req, res) => {
  let { uid } = req.params;

  let alumno = await userService.traeUnUsuario(uid);
  let profesor = await userService.traeUnProfesor(alumno.profesor);
  res.render("confeccionRutinas", {
    style: "confeccionRutinas.css",
    alumno: alumno,
    profesor: profesor,
  });
};

exports.rutina = async (req, res) => {
  let { number, uid } = req.params;
  let usuario = await userService.traeUnUsuario(uid);
  let alumno = false;
  if (req.session.user.rol === "alumno") {
    alumno = true;
  }

  let rutina = usuario.rutinas[number];
  res.render("rutina", { rutina: rutina, alumno });
};
