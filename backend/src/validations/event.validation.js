"use strict"
import Joi from "joi";
//Esquema de validación para la creación de eventos
export const eventValidation= Joi.object({
    titulo: Joi.string()
    .min(3)
    .max(30)
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
    .max(15)
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
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .messages({
        "string.pattern.base": "La fecha del evento debe tener el formato DD-MM-YYYY.",
        "string.empty": "La fecha del evento es obligatoria.",
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