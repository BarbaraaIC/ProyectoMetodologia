"use strict";
import Joi from "joi";

// esquema de validación para la votación
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

//esquema de validación para mostrar candidatos
export const mostrarCandidatosValidation = Joi.object({
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

export const emitirVotoValidation = Joi.object({
    rut_votante: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
        "string.pattern.base":
        "El RUT del votante solo puede contener letras.",
        "string.min": "El RUT del votante debe tener al menos 3 caracteres.",
        "string.max": "El RUT del votante no puede exceder los 20 caracteres.",
        "string.empty": "El RUT del votante es obligatorio y debe ser el formato 22.222.222-2.",
    }),
})

export const resultadosVotacionValidation = Joi.object({
    id_candidato: Joi.number()
    .integer()
    .min(1)
    .max(1000)
    .required()
    .messages({
        "number.base": "El ID del candidato debe ser un número.",
        "number.integer": "El ID del candidato debe ser un número entero.",
        "number.min": "El ID del candidato debe ser mayor que 0.",
        "any.required": "El ID del candidato es obligatorio."
    }),
})
