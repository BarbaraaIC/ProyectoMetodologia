"use strict"
import Joi from "joi";
//Esquema de validación para la creación de reuniones
export const meetingValidation= Joi.object({
    titulo: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[a-zA-Z0-9_, ]+$/)
    .messages({
    "string.pattern.base":
    "El titulo de la reunion puede contener letras, números, guiones bajos, espacios y comas.",
    "string.min": "El titulo de la reunion debe tener al menos 3 caracteres.",
    "string.max": "El titulo de la reunion no puede exceder los 30 caracteres.",
    "string.empty": "El titulo de la reunion es obligatorio.",
    }),

    descripcion: Joi.string()
    .min(5)
    .max(100)
    .optional()
    .pattern(/^[a-zA-Z0-9_, ]+$/)
    .messages({
    "string.pattern.base":
    "La descripcion de la reunion puede contener letras, números, guiones bajos, espacios y comas.",
    "string.min": "La descripcion de la reunion debe tener al menos 5 caracteres.",
    "string.max": "La descripcion de la reunion no puede exceder los 100 caracteres.",
    "string.empty": "La descripcion de la reunion es obligatoria.",
    }),
    fecha: Joi.string()
    .required()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .messages({
        "string.pattern.base": "La fecha de la reunion debe tener el formato DD-MM-YYYY.",
        "string.empty": "La fecha de la reunion es obligatoria.",
    }),

    hora: Joi.string()
    .required()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .messages({
        "string.pattern.base": "La hora debe tener el formato HH:mm (por ejemplo, 18:30).",
        "string.empty": "La hora de la reunión es obligatoria."
    }),

    lugar: Joi.string()
    .min(3)
    .max(100)
    .required()
    .pattern(/^[a-zA-Z0-9_, ]+$/)
    .messages({
        "string.pattern.base":
        "El lugar de la reunion puede contener letras, números, guiones bajos, espacios y comas.",
        "string.min": "El lugar de la reunion debe tener al menos 3 caracteres.",
        "string.max": "El lugar de la reunion no puede superar los 100 caracteres.",
        "string.empty": "El lugar de la reunion no puede estar vacío.",
    }),
})
    .unknown(false)

