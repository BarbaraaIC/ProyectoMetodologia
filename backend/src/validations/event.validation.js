"use strict"
import Joi from "joi";
//Esquema de validación para la creación de eventos
export const eventValidation= Joi.object({
    titulo: Joi.string()
    .min(5)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
    "string.pattern.base":
    "El titulo del evento solo puede contener letras, números y guiones bajos.",
    "string.min": "El titulo del evento debe tener al menos 3 caracteres.",
    "string.max": "El titulo del evento no puede exceder los 30 caracteres.",
    "string.empty": "El titulo del evento es obligatorio.",
    }),

    descripcion: Joi.string()
    .min(5)
    .max(100)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
    "string.pattern.base":
    "La descripcion del evento puede contener letras, números y guiones bajos.",
    "string.min": "La descripcion del evento debe tener al menos 5 caracteres.",
    "string.max": "La descripcion del evento no puede exceder los 15 caracteres.",
    "string.empty": "La descripcion del evento es obligatoria.",
    }),

    fecha: Joi.string()
    .required()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
        "string.pattern.base": "La fecha debe tener el formato YYYY-MM-DD.",
        "string.empty": "La fecha del evento es obligatoria.",
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
    .max(20)
    .required()
    .messages({
        "string.base": "El lugar del evento debe ser una cadena de texto.",
        "string.min": "El lugar del evento debe tener al menos 3 caracteres.",
        "string.max": "El lugar del evento no puede superar los 20 caracteres.",
        "string.empty": "El lugar del evento no puede estar vacío.",
    }),

})
    .unknown(false)
    .messages({
    "object.unknown": "No se permiten campos adicionales",
    });