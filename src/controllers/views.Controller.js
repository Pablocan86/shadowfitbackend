const UserManager = require("../dao/classes/users.dao.js");

const userService = new UserManager();

exports.home = async (req, res) => {
  if (!req.session.user) {
    return res.render("home");
  }
  if (req.session.user.rol === "alumno") {
    let alumno = req.session.user;
    return res.render("home", { alumno: alumno, session: req.session.user });
  }
  if (req.session.user.rol === "profesor") {
    let profesor = req.session.user;
    return res.render("home", {
      profesor: profesor,
      session: req.session.user,
    });
  }
};

exports.confeccionRutinas = async (req, res) => {
  let alumnos = await userService.traeUsuarios();
  res.render("confeccionRutinas", {
    style: "confeccionRutinas.css",
    alumnos: alumnos,
  });
};