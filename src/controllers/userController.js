const UserManager = require("../dao/classes/users.dao.js");
const { createHash, isValidPassword } = require("../utils.js");

const userService = new UserManager();

exports.traeUsuarios = async (req, res) => {
  try {
    let usuarios = await userService.traeUsuarios();
    res.send(usuarios);
  } catch (error) {
    console.error(error);
    res.json({ message: `No se encuentran usuarios` });
  }
};

exports.perfilAlumno = async (req, res) => {
  let { uid } = req.params;
  try {
    let isProfesor = true;
    let profesor;
    let usuario = await userService.traeUnUsuario(uid);

    let profesores = await userService.traerProfesores();

    if (usuario.profesor === "") {
      isProfesor = false;
    } else {
      profesor = await userService.traeUnProfesor(usuario.profesor);
    }

    res.render("perfilAlumno", {
      usuario: usuario,
      profesores: profesores,
      isProfesor: isProfesor,
      profesorDesignado: profesor,
    });
  } catch (error) {}
};

exports.perfilProfesor = async (req, res) => {
  let { pid } = req.params;
  try {
    let listaAlumnos = [];
    let alumnos = await userService.traeUsuarios();
    let profesor = await userService.traeUnProfesor(pid);
    for (let id of profesor.alumnos) {
      let alumno = await userService.traeUnUsuario(id);
      listaAlumnos.push(alumno);
    }
    res.render("perfilProfesor", {
      profesor: profesor,
      alumnos: listaAlumnos,
      style: "perfilProfesor.css",
      title: "Perfil",
    });
  } catch (error) {}
};

exports.panelAlumnos = async (req, res) => {
  let { uid } = req.params;
  let alumno = await userService.traeUnUsuario(uid);
  res.render("panelAlumnos", {
    alumno: alumno,
    style: "panelAlumno.css",
    title: "Panel Alumno",
  });
};

exports.login = async (req, res) => {
  if (!req.user)
    return res
      .status(400)
      .send({ status: "error", error: "Credenciales invalidas" });
  try {
    if (!req.user) return res.redirect("/log");
    if (req.user.rol === "alumno") {
      req.session.user = {
        id: req.user._id,
        nombre: req.user.nombre,
        apellido: req.user.apellido,
        email: req.user.email,
        cumpleanos: req.user.cumpleanos,
        fecha_registro: req.user.fecha_registro,
        profesor: req.user.profesor,
        rutinas: req.user.rutinas,
        rol: req.user.rol,
      };
      return res.redirect(`/api/users/perfil/${req.session.user.id}`);
    }
    if (req.user.rol === "profesor") {
      req.session.user = {
        id: req.user._id,
        nombre: req.user.nombre,
        apellido: req.user.apellido,
        email: req.user.email,
        cumpleanos: req.user.cumpleanos,
        fecha_registro: req.user.fecha_registro,
        alumnos: req.user.alumnos,
        rol: req.user.rol,
      };
      return res.redirect(`/api/users/perfil/profesor/${req.session.user.id}`);
    }
    return res.send({ message: "Usted es administrador" });
  } catch (err) {
    res.status(500).send("Error al iniciar sesión");
  }
};

exports.rutina = async (req, res) => {
  res.render("confeccionRutinas");
};
// exports.crearUsuario = async (req, res) => {
//   let { nombre, apellido, email, password, cumpleanos } = req.body;
//   try {
//     let fechaActual = new Date();
//     let nuevoUsuario = {
//       nombre: nombre,
//       apellido: apellido,
//       email: email,
//       password: createHash(password),
//       cumpleanos: cumpleanos,
//       fecha_registro: fechaActual,
//     };

//     const result = await userService.crearUsuario(nuevoUsuario);

//     return result;
//   } catch (error) {
//     console.log(error);
//     res.json({ message: "No se puede crear usuario" });
//   }
// };

exports.cargarProfesor = async (req, res) => {
  let { uid, pid } = req.params;

  try {
    let alumno = await userService.traeUnUsuario(uid);
    let profesor = await userService.traeUnProfesor(pid);
    if (alumno.profesor === "") {
      let existeAlumno = profesor.alumnos.find((e) => e === uid);
      if (existeAlumno) {
        return res
          .status(401)
          .json({ message: "Ya existe alumno en lista del profesor" });
      }
    }
    await userService.cargarAlumnos(pid, uid);
    let result = await userService.actualizaPropiedad(uid, { profesor: pid });
    return res.status(200).json({ message: "Profesor agregado correctamente" });
  } catch (error) {
    console.log("Entro en el catch " + error);
  }
};

exports.cargarRutina = async (req, res) => {
  let { uid } = req.params;
  let { rutina } = req.body;
  try {
    let alumno = await userService.traeUnUsuario(uid);

    await userService.cargarRutina(uid, rutina);
    return res.status(200).json({ message: "Rutina agregada correctamente" });
  } catch (error) {
    console.log("Entro en el catch " + error);
  }
};

exports.actualizarUsuario = async (req, res) => {
  let { uid } = req.params;
  let { nombre, apellido, email, compleanos } = req.body;
  let usuario = await userService.traeUnUsuario(uid);
  try {
    let usuarioActualizado = {
      _id: usuario._id,
      nombre: nombre || usuario.nombre,
      apellido: apellido || usuario.apellido,
      email: email || usuario.email,
      cumpleanos: usuario.cumpleanos,
      fecha_registro: usuario.fecha_registro,
      rol: usuario.rol,
    };
    let result = await userService.actualizaUsuario(uid, usuarioActualizado);
    res.send({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.json({ message: "Error al acualizar" });
  }
};
