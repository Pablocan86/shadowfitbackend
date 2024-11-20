const express = require("express");
const usersRouter = require("./routes/users.router.js");
const viewsRouter = require("./routes/views.router.js");
const sessionRouter = require("./routes/api/session.router.js");
const paymentRouter = require("./routes/payment.routes.js");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = 8080;

const httpSever = app.listen(PORT, () =>
  console.log(`Listeninig on PORT ${PORT}`)
);

const socketServer = new Server(httpSever);
//Secreto
app.use(cookieParser(/*Tiene que ir una frase secreta*/));
app.use(cors());
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    secret: "shadowFit86",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
//Permite leer datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  try {
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error en la conexión", error);
  }
};

connectMongoDB();

app.use("/api/users", usersRouter);
app.use("/api/views", viewsRouter);
app.use("/api/session", sessionRouter);
app.use("/api/mp", paymentRouter);

// app.listen(PORT, () => console.log(`Server runninng on PORT:${PORT}`));
