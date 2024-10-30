const mongoose = require("mongoose");

const userCollection = "usuarios";

const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  cumpleanos: String,
  fecha_registro: String,
  profesor: { type: String, default: "" },
  rutinas: { type: [], default: [] },
  rol: { type: String, default: "alumno" },
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;
