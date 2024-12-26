import express, { response } from "express";
import {
  formularioLogin,
  formularioRegister,
  formularioPasswordRecovery,
  registrar,
  confirmar,
  userAutentication,
} from "../controllers/userController.js";

const router = express.Router();

//son las rutas para acceder a las secciones o funciones de nuestras apis = END Points (Pregunta de examen)
//y los : en un aruta definen de manera posicional los parametros de entrada

//La ruta o la funcion collback de lo que se va a hacer
router.get("/FindByid/:id", function (req, res) {
  res.send(`Se esta solicitando buscar al usuario con su ID: ${req.params.id}`);
});

router.post("/newUser/:name/:email/:password", function (req, res) {
  res.send(
    `Se ha ssolicitado la creacion de un nuevo usuario de nombre: ${req.params.name}, asociado al correo electronico: ${req.params.email} con contraseña: ${req.params.password}`
  );
});

router.put(`/replaceUserByEmail/:name/:email/:password`, function (req, res) {
  res.send(
    `se ha solicitado el remplazo de toda la informacion del usuario: ${req.params.name}, con correo: ${req.params.email} y contraseña: ${req.params.password}`
  );
});

router.patch(
  "/updatePassword/:email/:newPassword/:newPasswordConfirm",
  function (req, res) {
    const { email, newPassword, newPasswordConfirm } = req.params; //Desustruraccion de un objeto

    if (newPassword === newPasswordConfirm) {
      res.send(
        `Se ha solicitado la actualizacion de la contraseña del usuario con correo: ${email} con la contraseña ${newPassword}, se aceptan los cambios ya que la nueva contraseña y su confirmacion coinciden`
      );
      console.log(newPassword);
      console.log(newPasswordConfirm);
    } else {
      res.send(
        `Se ha solicitado la actualizacion de la contraseña del usuario con correo: ${email} con la nueva contraseña ${newPassword}, pero se rechaza el cambio dado que la nueva contraseña y su confirmacion no coinciden`
      );
      console.log(newPassword);
      console.log(newPasswordConfirm);
    }
  }
);

router.delete("/deleteUser/:email", function (req, res) {
  res.send(
    `Se ha solicitado la eliminacion del usuario asociado al correo: ${req.params.email}`
  );
});
//Loguearse
router.get("/login", formularioLogin /*middleware*/);
router.post('/login', userAutentication)
//Crear cuenta
router.get(`/createAccount`, formularioRegister);
router.post(`/createAccount`, registrar);
//Confirmar Token
router.get('/confirm/:token', confirmar)
//Recuperar contraseña
router.get(`/passwordRecovery`, formularioPasswordRecovery);
//<Actualizar contraseña>
// router.get("/passwoerdRecovery/:token", verifyTknPswChg)
// router.post("/passwordRecovery/:token", updatePassword)

export default router;
