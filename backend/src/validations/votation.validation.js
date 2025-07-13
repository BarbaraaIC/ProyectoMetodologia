"use strict";
import Joi from "joi";

export const votationValidation = Joi.object({

    rut: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
    "string.pattern.base":
    "El RUT del usuario solo puede contener letras.",
    "string.min": "El RUT del usuario debe tener al menos 20 caracteres.",
    "string.max": "El nombre del usuario no puedo exceder los 20 caraceres.",
    "string.empty": "El RUT del usuario es obligatorio.",
    }),

    username: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
    "string.pattern.base":
    "El nombre del usuario solo puede contener letras.",
    "string.min": "El nombre del usuario debe tener al menos tres caracteres.",
    "string.max": "El nombre del usuario no puedo exceder los 20 caraceres.",
    "string.empty": "El nombre del usuario es obligatorio.",
    }),

    cargo: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
    "string.pattern.base":
    "El cargo del postulante solo puede contener letras.",
    "string.min": "El cargo del usuario debe tener al menos tres caracteres.",
    "string.max": "El cargo del usuario no puedo exceder los 20 caraceres.",
    "string.empty": "El cargo del usuario debe ser Presidente, Secretario o Tesorero.",
    }),

})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten campos adicionales",
    });