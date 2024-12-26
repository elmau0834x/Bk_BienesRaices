import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
  res.send("Hola desde la web, en Node.js");
});

router.get("/quieneres", function (req, res) {
  res.json({
    nombre: "Mauricio Rosales Gabriel",
    carrera: "TI DSM",
    grado: 4,
    grupo: "A",
  });
});

export default router;
