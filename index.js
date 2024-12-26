import generalRoutes from "./routes/generalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import db from "./config/db.js";

console.log("Hola desde Node.js, esto esta en hot reload");
//Ejemplo de activacion hot reload
// const express = require('express');
import express from "express";

const app = express();
app.set("view engine", "pug");
app.set("Views", "/.Views");

//Habilitar lectura de datos de formulario
app.use(express.urlencoded({ extended: true }));

//conexion a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log("conexion correcta a la base de datos");
} catch (error) {
  console.log(error);
}

// ? Carpeta publica de recursos estaticos (assets)
app.use(express.static("public"));

const port = process.env.BACKEND_PORT || 3000;

app.listen(port, () => {
  console.log(`La aplicacion esta iniciada en el puerto: ${port}`);
});

//routin
app.use("/", generalRoutes);
app.use("/user", userRoutes);
