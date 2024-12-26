import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/emails.js";
import { request, response } from "express";
// arrow function =
const formularioLogin = (req, res) => {
  res.render(`auth/login`, {
    autenticado: false,
    page: "Iniciar sesion",
  });
};

const formularioRegister = (req, res) => {
  res.render(`auth/register`, {
    page: "Registrar una cuenta",
  });
};

const registrar = async (req, res) => {
  //validacion
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no debe ir vacio")
    .run(req);
  await check("email")
    .isEmail()
    .withMessage("Lo que ingresa debe ser tipo correo")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("La contraseña no debe estar vacia")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe de ser minimo 8 caracteres")
    .run(req);
  await check("password2")
    .equals(req.body.password)
    .withMessage("La contraseña no coincide con la anterior")
    .run(req);

  let resultado = validationResult(req);

  //   console.log(resultado.array());

  //verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    //hay errores
    return res.render(`auth/register`, {
      page: "Registrar una cuenta",
      errors: resultado.array(),
      user: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  //extraer los datos
  const { nombre, email, password } = req.body;

  //vwrificar que el usuario ya esta registrado
  const existUser = await User.findOne({ where: { email } });
  if (existUser) {
    return res.render(`auth/register`, {
      page: "Registrar una cuenta",
      errors: [{ msg: "El usuario ya esta regitrado" }],
      user: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //almacenar un usuario
  const usuario = await User.create({
    nombre,
    email,
    password,
    token: generarId(),
  });
  //envia email de verificacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //Mostrar mensaje de confirmacion
  res.render("templates/mensaje", {
    page: "Cuenta creada correctamente",
    mensaje: "Hemos enviado un email de Confirmacion, presiona en el enlace",
  });
};

//Funcion que comprueba una cuenta
const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuario = await User.findOne({ where: { token } });

  if (!usuario) {
    return res.render("auth/confirmAccount", {
      page: "Error al confirmar cuenta",
      message: "Hubo un error al confirmar cuena, intenta de nueva mas tarde",
      error: true,
    });
  }
  //verificar si el token es valido
  //confirmar la cuenta
  usuario.token = null;
  usuario.confirm = true;
  await usuario.save();

  res.render("auth/confirmAccount", {
    page: "Cuenta confirmada",
    message: "La cuenta se confirmo correctamente",
  });
};

const formularioPasswordRecovery = (req, res) => {
  res.render(`auth/passwordRecovery`, {
    page: "Recuperar contraseña",
  });
};

// const passwordReset = async(req, res) =>{
//   console.log("Validando datos")
//   await check('correo_usuario').notEmpty().withMessage("El correo electronico no tiene el formato de: usuario@dominio.extension").run(req)
//   let result = validationResult(req)
//   if (!result.isEmpty()){
//     return response.render("auth/passwordRecovery",{
//       page: "Error al intentar resetear la contraseña",
//       errors: result.array(),
//       csrfToken: request.csrfToken()
//     })
//   }
//   const {correo_usuario:email} = req.body;

//   const existUser = await User.findOne({where: {email}})
// }
// const verifyTknPswChg = (req,res)=>{
//   const {token} = req.params;
//   const userTokenOwner = await User.findOne({where: {token}})
//   return 0;

// }
// const updatePassword = (req,res)=>{
//   return 0

// }

const userAutentication = async (req, res) => {
  console.log("El usuaeio esta intentando acceder...");
  return 0;
  await check("pass_usuario").notEmpty().withMessage;
};

export {
  formularioLogin,
  formularioRegister,
  formularioPasswordRecovery,
  registrar,
  confirmar,
  userAutentication,
};
