import { Request, Response } from "express";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

export const apiEmail = async (req: Request, res: Response) => {
  try {
    const { asunto, nombre, email, contenido } = req.body;

    // Validación básica de entradas
    if (!asunto || !nombre || !email || !contenido) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Configurar el transporte SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Definir el correo electrónico a enviar
    const mailOptions: nodemailer.SendMailOptions = {
      from:"", // El correo que usas para enviar
      to: process.env.EMAIL_USER, // Tu correo personal
      subject: asunto,
      text: `Nombre: ${nombre}\nEmail: ${email}\n\n${contenido}`, // Incluye el nombre y el contenido en el texto
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);

    // Proporcionar una respuesta adecuada al cliente
    res.json({ message: "Correo enviado correctamente", info: info.response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor al enviar el correo" });
  }
};
