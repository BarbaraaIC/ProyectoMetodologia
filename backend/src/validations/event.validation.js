"use strict"
import Joi from "joi";
//Esquema de validación para la creación de eventos
export const eventValidation= Joi.object({
    titulo: Joi.string()
    .min(5)
    .max(100)
    .required()
    .pattern(/^[a-zA-Z0-9_, ]+$/)
    .messages({
    "string.pattern.base":
    "El titulo del evento puede contener letras, números, guiones bajos, espacios y comas.",
    "string.min": "El titulo del evento debe tener al menos 5 caracteres.",
    "string.max": "El titulo del evento no puede exceder los 100 caracteres.",
    "string.empty": "El titulo del evento es obligatorio.",
    }),

    descripcion: Joi.string()
    .min(5)
    .max(100)
    .required()
    .pattern(/^[a-zA-Z0-9_, ]+$/)
    .messages({
    "string.pattern.base":
    "La descripcion del evento puede contener letras, números, guiones bajos, espacios y comas.",
    "string.min": "La descripcion del evento debe tener al menos 5 caracteres.",
    "string.max": "La descripcion del evento no puede exceder los 100 caracteres.",
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
    .max(100)
    .required()
    .pattern(/^[a-zA-Z0-9_, ]+$/)
    .messages({
        "string.pattern.base": "El lugar del evento puede contener letras, números, guiones bajos, espacios y comas.",
        "string.min": "El lugar del evento debe tener al menos 3 caracteres.",
        "string.max": "El lugar del evento no puede superar los 100 caracteres.",
        "string.empty": "El lugar del evento no puede estar vacío.",
    }),

    tipo: Joi.string()
    .valid("evento", "reunion")
    .required()
    .messages({
        "any.only": "El campo 'tipo' solo puede ser 'evento' o 'reunion'.",
        "string.base": "El campo 'tipo' debe ser un texto.",
        "string.empty": "El campo 'tipo' no puede estar vacío.",
        "any.required": "El campo 'tipo' es obligatorio."
    }),
    //agregue votacion
    votacion: Joi.boolean()
    .optional()
    .default(false)
    .messages({
        "boolean.base": "El campo 'votacion' debe ser verdadero o falso."
    }),

    duracionVotacion: Joi.number()
    .integer()
    .min(60)
    .when("votacion", {
    is: true,
    then: Joi.required().messages({
        "number.base": "La duración debe ser un número.",
        "number.min": "La duración mínima de votación es de 1 hora (3600 segundos).",
        "number.max": "La duración máxima de votación es de 24 horas.",
        "any.required": "La duración de la votación es obligatoria si votación está activa.",
    }),
    otherwise: Joi.optional(),
    }),
    //votacionInicio: Joi.date()
    //.required(),

    //votacionFin: Joi.date()
    //.required()
    //agregue votacion
})
    .unknown(false)
    .messages({
    "object.unknown": "No se permiten campos adicionales",
    });

/*export const eventValidationVotation = Joi.object({
        votacionAbierta: Joi.boolean().optional(),
        votacionInicio: Joi.date().optional(),
        votacionFin: Joi.date().optional(), 
    }).messages({
        "object.unknown": "No se permiten campos adicionales",
    });
    */