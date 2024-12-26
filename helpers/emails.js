import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const { email, nombre, token } = datos

    //Enviar el email
    await transport.sendMail({
      from: "BienesRaices.com",
      to: email,
      subject: "Confirma tu cuenta en BienesRaices.com",
      text: "Confirma tu cuenta en BienesRaices.com",
      html: `
        <p>Hola ${nombre}. Haz creado una cuenta en BienesRaices.com. </p>

        <p>Para confirmar tu cuenta haz clic
        <a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT ?? 3000}/user/confirm/${token}">Aqui</a> </p>
        <p>Si tu no creaste esta cuenta haz caso omiso a este mensaje</p>
      `,
    });
};

const emailChangePassword = async (datos) => {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const { email, nombre, token } = datos

    //Enviar el email
    await transport.sendMail({
      from: "BienesRaices.com",
      to: email,
      subject: "Modifica tu cuenta en BienesRaices.com",
      text: "Modifica tu contrase de tu cuenta en BienesRaices.com",
      html: `
        <p>Hola ${nombre}. Haz solicitado un restablecimiento de tu contraseña en tu cuenta de BienesRaices.com. </p>

        <p>Para cambiar tu contraseña haz clic
        <a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}/"> Aqui </a> </p>
        <p>Si tu no solicitaste el cambio de contraseña haz caso omiso a este mensaje</p>
      `,
    });
};

export { 
  emailRegistro,
  emailChangePassword,
 };
