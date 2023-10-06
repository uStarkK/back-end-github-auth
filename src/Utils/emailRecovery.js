import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { logger } from "./logger.js";
dotenv.config()

const { GOOGLE_EMAIL, GOOGLE_PW } = process.env

export async function sendMail(options) {
    const transport = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: GOOGLE_EMAIL,
            pass: GOOGLE_PW,
        },
    });

    try {
        const result = await transport.sendMail({
            ...options,
        });
        logger.info("Correo electrónico enviado exitosamente.");
        return result;
    } catch (error) {
        logger.error("Error al enviar el correo electrónico:", error);
        throw error;
    }
}